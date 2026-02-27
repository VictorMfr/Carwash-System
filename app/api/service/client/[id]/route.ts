import { Client } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import { ClientObjectSchema } from "@/lib/definitions";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener cliente
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Client, params);
}

// Actualizar cliente
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Client,
        params,
        request,
        validationSchema: ClientObjectSchema,
    });
}

// Eliminar cliente
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Client, params);
}
