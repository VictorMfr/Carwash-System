import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { Service, Recipe, Vehicle, Client, Transaction, Account, Method } from "@/services/backend/models/associations";
import { handleServerError } from "@/lib/error";

const formatDate = (value: any) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return {
        date,
        label: dayjs(date).format("DD/MM/YYYY")
    };
};

export async function GET() {
    try {
        const [services, transactions] = await Promise.all([
            Service.findAll({
                include: [
                    { model: Recipe, as: "Recipe" },
                    { model: Vehicle, as: "Vehicle", include: [{ model: Client, as: "Client" }] }
                ]
            }),
            Transaction.findAll({
                include: [
                    { model: Account, as: "Account" },
                    { model: Method, as: "Method" }
                ]
            })
        ]);

        const serviceItems = services.map((service) => {
            const parsedDate = formatDate((service as any).date ?? (service as any).created_at ?? (service as any).createdAt);
            const clientName = service.Vehicle?.Client
                ? `${service.Vehicle.Client.name} ${service.Vehicle.Client.lastname}`.trim()
                : "";

            return {
                id: `svc-${service.id}`,
                title: `Servicio ${service.Recipe?.name ?? ""} - ${service.status ?? ""}`.trim(),
                detail: `${parsedDate?.label ?? ""}${parsedDate ? " • " : ""}${clientName}`.trim(),
                date: parsedDate?.date?.toISOString() ?? null
            };
        });

        const financeItems = transactions.map((transaction) => {
            const parsedDate = formatDate((transaction as any).date ?? (transaction as any).created_at ?? (transaction as any).createdAt);
            const amount = Number(transaction.amount ?? 0);
            const isIncome = amount >= 0;
            const amountLabel = Math.abs(amount).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            return {
                id: `tx-${transaction.id}`,
                title: `${isIncome ? "Ingreso" : "Costo"} Bs. ${amountLabel}`,
                detail: `${parsedDate?.label ?? ""}${parsedDate ? " • " : ""}${transaction.Account?.name ?? ""}`.trim(),
                date: parsedDate?.date?.toISOString() ?? null
            };
        });

        const combined = [...serviceItems, ...financeItems]
            .filter(item => !!item.date)
            .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

        return NextResponse.json(combined);
    } catch (error) {
        return handleServerError(error);
    }
}

