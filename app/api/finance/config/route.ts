import { NextResponse } from "next/server";
import { Account } from "@/services/backend/models/associations";
import { getFinanceSettings, setFinanceSettings } from "@/services/backend/config/settings";
import { handleServerError } from "@/lib/error";

// Obtener configuración financiera
export async function GET() {
    try {
        const financeSettings = await getFinanceSettings();
        let account = null;
        if (financeSettings.financeAccountId) {
            const accountModel = await Account.findByPk(financeSettings.financeAccountId);
            if (accountModel) {
                account = {
                    id: accountModel.id,
                    name: accountModel.name,
                    description: accountModel.description,
                };
            }
        }
        return NextResponse.json({ ...financeSettings, account });
    } catch (error) {
        return handleServerError(error);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const financeAccountId =
            body.financeAccountId === null || body.financeAccountId === undefined
                ? null
                : Number(body.financeAccountId);

        if (financeAccountId !== null) {
            if (Number.isNaN(financeAccountId)) {
                return NextResponse.json(
                    { message: "financeAccountId inválido" },
                    { status: 400 }
                );
            }
            const accountExists = await Account.findByPk(financeAccountId);
            if (!accountExists) {
                return NextResponse.json(
                    { message: "La cuenta seleccionada no existe" },
                    { status: 404 }
                );
            }
        }

        await setFinanceSettings({ financeAccountId });
        return NextResponse.json({ message: "Configuración financiera guardada", financeAccountId });
    } catch (error) {
        return handleServerError(error);
    }
}

