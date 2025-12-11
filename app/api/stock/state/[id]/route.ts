import { State } from "@/services/backend/models/associations";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import { NextRequest } from "next/server";
import { StateObjectSchema } from "@/lib/definitions";

// Obtener estado por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(State, params);
}

// Actualizar estado
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: State,
        params: params,
        request: request,
        validationSchema: StateObjectSchema,
    });
}

// Eliminar estado
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(State, params);
}

