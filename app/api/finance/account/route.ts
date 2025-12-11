import { AccountObjectSchema } from "@/lib/definitions";
import { Account } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear cuenta
export async function POST(request: NextRequest) {
    return await createModel({
        model: Account,
        validationSchema: AccountObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener cuentas
export async function GET() {
    return await getModels(Account);
}

// Eliminar cuentas
export async function DELETE(request: NextRequest) {
    return await deleteModels(Account, request);
}

