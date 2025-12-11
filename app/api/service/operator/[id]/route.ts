import { Operator } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import { OperatorSchema } from "@/lib/definitions";

// Obtener operador
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Operator, params);
}

// Actualizar operador
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Operator,
        params,
        request,
        validationSchema: OperatorSchema,
    });
}

// Eliminar operador
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Operator, params);
}

