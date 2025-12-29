import { BrandSchema } from "@/lib/definitions";
import { Brand } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener marca por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Brand, params);
}

// Actualizar marca
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Brand,
        params,
        request,
        validationSchema: BrandSchema,
    });
}

// Eliminar marca
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Brand, params);
}