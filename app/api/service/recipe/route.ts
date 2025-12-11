import { RecipeObjectSchema } from "@/lib/definitions";
import { Recipe } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear receta
export async function POST(request: NextRequest) {
    return await createModel({
        model: Recipe,
        validationSchema: RecipeObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener recetas
export async function GET() {
    return await getModels(Recipe);
}

// Eliminar recetas
export async function DELETE(request: NextRequest) {
    return await deleteModels(Recipe, request);
}

