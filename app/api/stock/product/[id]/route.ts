import { Product } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import { ProductObjectSchema } from "@/lib/definitions";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener producto por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Product, params);
}

// Actualizar producto
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Product,
        params: params,
        request: request,
        validationSchema: ProductObjectSchema,
    });
}

// Eliminar producto
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Product, params);
}
