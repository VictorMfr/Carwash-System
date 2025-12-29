import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import { NextRequest } from "next/server";
import Category from "@/services/backend/models/service/client/feedback/category";
import { CategoryObjectSchema } from "@/lib/definitions";

// Crear categoría
export async function POST(request: NextRequest) {
    return await createModel({
        model: Category,
        validationSchema: CategoryObjectSchema,
        request: request,
    });
}


// Obtener categorías
export async function GET(request: NextRequest) {
    return await getModels(Category);
}