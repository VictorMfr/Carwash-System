import {
    Service,
    Operator,
    Transaction,
    Account,
    Method,
} from "@/services/backend/models/associations";
import ServiceOperator from "@/services/backend/models/service/serviceOperator";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { getOperatorPaymentPercentage, getFinanceSettings } from "@/services/backend/config/settings";
import { getSession, decrypt } from "@/lib/session";
import getDollarRate from "@/lib/dollar";

const DEFAULT_PAYMENT_METHOD = "Personalizado";

type OperatorPaymentItem = {
    serviceId: number;
    operatorId: number;
    amount: number;
};

type OperatorPaymentRow = {
    id: number;
    operator: string;
    payment: number;
    items: OperatorPaymentItem[];
};

const fetchOperatorShares = async () => {
    const services = await Service.findAll({
        attributes: ["id", "date", "bol_charge"],
        include: [
            {
                model: Operator,
                as: "Operators",
                attributes: ["id", "name", "lastname"],
                through: {
                    attributes: ["isPaid", "paidAmount", "paidAt"],
                },
            },
        ],
    });

    const operatorIdToData = new Map<
        number,
        {
            id: number;
            name: string;
            lastname: string;
            totalShareBase: number;
            items: OperatorPaymentItem[];
        }
    >();

    for (const service of services) {
        const serviceAny = service as any;
        const operators =
            (serviceAny.Operators ?? []) as Array<
                {
                    id: number;
                    name: string;
                    lastname: string;
                    ServiceOperator?: { isPaid: boolean };
                }
            >;
        if (!operators.length) continue;
        const shareBase = Number(serviceAny.bol_charge) / operators.length;
        for (const op of operators) {
            const pivot =
                (op as any).ServiceOperator ??
                (op as any).services_operators ??
                (op as any).Services_operators;
            if (pivot?.isPaid) continue;
            const current = operatorIdToData.get(op.id);
            if (current) {
                current.totalShareBase += shareBase;
                current.items.push({
                    serviceId: serviceAny.id,
                    operatorId: op.id,
                    amount: shareBase,
                });
            } else {
                operatorIdToData.set(op.id, {
                    id: op.id,
                    name: op.name,
                    lastname: op.lastname,
                    totalShareBase: shareBase,
                    items: [
                        {
                            serviceId: serviceAny.id,
                            operatorId: op.id,
                            amount: shareBase,
                        },
                    ],
                });
            }
        }
    }

    return operatorIdToData;
};

const buildPaymentRows = async (filterIds?: Set<number>): Promise<OperatorPaymentRow[]> => {
    const operatorIdToData = await fetchOperatorShares();
    const percentage = await getOperatorPaymentPercentage();

    return Array.from(operatorIdToData.values())
        .filter((op) => !filterIds || filterIds.has(op.id))
        .map((op) => {
            const paymentItems = op.items.map((item) => ({
                serviceId: item.serviceId,
                operatorId: item.operatorId,
                amount: Number((item.amount * percentage).toFixed(2)),
            }));
            const total = paymentItems.reduce((sum, item) => sum + item.amount, 0);
            return {
                id: op.id,
                operator: `${op.name} ${op.lastname}`.trim(),
                payment: Number(total.toFixed(2)),
                items: paymentItems,
            };
        })
        .filter((row) => row.payment > 0);
};

const ensurePaymentMethod = async () => {
    const [method] = await Method.findOrCreate({
        where: { name: DEFAULT_PAYMENT_METHOD },
        defaults: { name: DEFAULT_PAYMENT_METHOD },
    });
    return method;
};

// Obtener pagos
export async function GET() {
    try {
        const rows = await buildPaymentRows();
        return NextResponse.json(rows);
    } catch (error) {
        return handleServerError(error);
    }
}

/*
    Esta ruta es para crear transacciones relacionadas a los pagos de los operadores
*/
export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ message: "Sesión no encontrada" }, { status: 401 });
        }
        const decoded = await decrypt(session);
        if (!decoded) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 });
        }

        const body = await request.json().catch(() => ({}));
        const operatorIdsInput = Array.isArray(body?.operatorIds)
            ? body.operatorIds.map((id: any) => Number(id)).filter((id: number) => !Number.isNaN(id))
            : undefined;
        const operatorIdSet = operatorIdsInput?.length ? new Set(operatorIdsInput) : undefined;

        const rows = await buildPaymentRows(operatorIdSet as Set<number>);
        if (!rows.length) {
            return NextResponse.json(
                { message: "No hay pagos pendientes para los operadores seleccionados" },
                { status: 400 }
            );
        }

        const { financeAccountId } = await getFinanceSettings();
        if (!financeAccountId) {
            return NextResponse.json(
                { message: "Configura una cuenta financiera antes de realizar pagos" },
                { status: 400 }
            );
        }

        const account = await Account.findByPk(financeAccountId);
        if (!account) {
            return NextResponse.json(
                { message: "La cuenta configurada ya no existe. Configúrala nuevamente." },
                { status: 400 }
            );
        }

        const method = await ensurePaymentMethod();
        const userId = Number(decoded.userId);

        const results = [];

        for (const row of rows) {
            const transaction = await Transaction.create({
                date: new Date(),
                amount: row.payment,
                description: `Pago a operador ${row.operator}`,
                dollar_rate: (await getDollarRate())[0].promedio,
            });
            await transaction.setAccount(account.id);
            await transaction.setMethod(method.id);
            await transaction.setUser(userId);
            const paidAt = new Date();
            await Promise.all(
                row.items.map((item) =>
                    ServiceOperator.update(
                        {
                            isPaid: true,
                            paidAt,
                            paidAmount: item.amount,
                        },
                        {
                            where: {
                                serviceId: item.serviceId,
                                operatorId: item.operatorId,
                            },
                        }
                    )
                )
            );
            results.push({
                transactionId: transaction.id,
                operatorId: row.id,
                amount: row.payment,
            });
        }

        return NextResponse.json({
            message: `Pagos registrados: ${results.length}`,
            transactions: results,
        });
    } catch (error) {
        return handleServerError(error);
    }
}
