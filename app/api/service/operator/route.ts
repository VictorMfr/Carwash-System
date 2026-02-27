import { OperatorObjectSchema } from "@/lib/definitions";
import { Operator } from "@/services/backend/models/associations";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Crear operador
export async function POST(request: NextRequest) {
    try {
        const { name, lastname, phone, address } = await request.json();
        const operator = await Operator.create({ name, lastname, phone, address });
        return NextResponse.json(operator);
    } catch (error) {
        return handleServerError(error);
    }
}

// Obtener operadores
export async function GET() {
    return await getModels(Operator);
}

// Eliminar operadores
export async function DELETE(request: NextRequest) {
    return await deleteModels(Operator, request);
}

