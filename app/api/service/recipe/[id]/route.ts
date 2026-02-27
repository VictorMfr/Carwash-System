import { RecipeObjectSchema, RecipeSchema } from "@/lib/definitions";
import { Recipe } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener receta por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Recipe, params);
}

// Actualizar receta
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Recipe,
        params,
        request,
        validationSchema: RecipeObjectSchema,
    });
}

// Eliminar receta
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Recipe, params);
}

