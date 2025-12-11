import { BrandObjectSchema } from "@/lib/definitions";
import { Brand } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear marca
export async function POST(request: NextRequest) {
    return await createModel({
        model: Brand,
        validationSchema: BrandObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener marcas
export async function GET() {
    return await getModels(Brand);
}

// Eliminar marcas
export async function DELETE(request: NextRequest) {
    return await deleteModels(Brand, request);
}

