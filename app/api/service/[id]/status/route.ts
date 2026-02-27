import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { Recipe, Operator, Service, Vehicle, StockDetails, Transaction } from "@/services/backend/models/associations";
import { getFinanceSettings } from "@/services/backend/config/settings";
import { decrypt, getSession } from "@/lib/session";

const mapServiceResponse = (service: Service) => {
    const recipeName = service.Recipe?.name ?? '';
    const products = service.StockDetails ?? [];
    const vehiclePlate = service.Vehicle?.license_plate ?? null;
    const dollarRate = service.dollar_rate ?? null;
    const bolCharge = service.bol_charge ?? null;

    return {
        id: service.id,
        date: service.date,
        operators: service.Operators ?? [],
        recipeName: { name: recipeName, products },
        dollar_rate: dollarRate,
        bol_charge: bolCharge,
        status: service.status,
        vehicleLicensePlate: vehiclePlate,
        dollar_charge: dollarRate ? Number(bolCharge) / Number(dollarRate) : null,
    };
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const service = await Service.findByPk(id, {
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle' },
                { model: StockDetails, as: 'StockDetails' }
            ]
        }) as Service;


        const body = await request.json();

        const status = body.status;
        const method = body.method;

        if (status == 'Pendiente') {
            const transaction = await service.getTransactions() as Transaction;
            await transaction.destroy({ force: true });
            await service.update({ status });
        }

        if (status === 'Completado') {
            if (service.status === 'Completado') {
                const transaction = await service.getTransactions() as any;
                if (transaction.methodId === method.id) {
                    throw new Error('El servicio ya tiene un estado "Completado"');
                } else {
                    await transaction.setMethod(method.id);
                    return NextResponse.json(mapServiceResponse(service));
                }
            }

            const transaction = await service.createTransactions({
                date: service.date,
                amount: service.bol_charge,
                description: `Servicio #${service.id}`,
                dollar_rate: service.dollar_rate
            });

            const financeSettings = await getFinanceSettings();
            const accountId = financeSettings.financeAccountId;
            if (!accountId) throw new Error('No se ha configurado la cuenta de finanzas');

            await transaction.setAccount(accountId);
            await transaction.setMethod(method.id);
            const session = await getSession();
            const decoded = await decrypt(session as string);
            const userId = decoded.userId as string;
            await transaction.setUser(Number(userId));

            await service.update({ status });
        }

        const reloadedService = await service.reload({
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle' },
                { model: StockDetails, as: 'StockDetails' },
            ],
        }) as Service;

        return NextResponse.json(mapServiceResponse(reloadedService));

    } catch (error) {
        return handleServerError(error);
    }
}