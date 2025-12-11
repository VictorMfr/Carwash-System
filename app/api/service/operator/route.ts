import { OperatorObjectSchema } from "@/lib/definitions";
import { Operator } from "@/services/backend/models/associations";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import { NextRequest } from "next/server";

// Crear operador
export async function POST(request: NextRequest) {
    return await createModel({
        model: Operator,
        validationSchema: OperatorObjectSchema,
        request,
        uniqueField: 'phone',
    });
}

// Obtener operadores
export async function GET() {
    return await getModels(Operator);
}

// Eliminar operadores
export async function DELETE(request: NextRequest) {
    return await deleteModels(Operator, request);
}

