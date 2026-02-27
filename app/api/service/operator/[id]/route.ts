import { Operator } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import { OperatorObjectSchema } from "@/lib/definitions";
import { handleServerError } from "@/lib/error";

// Obtener operador
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Operator, params);
}

// Actualizar operador
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, lastname, phone, address } = await request.json();
        const operator = await Operator.findByPk(id);
        if (!operator) {
            return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
        }
        await operator.update({ name, lastname, phone, address });
        return NextResponse.json(operator);
    } catch (error) {
        return handleServerError(error);
    }
}

// Eliminar operador
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Operator, params);
}

