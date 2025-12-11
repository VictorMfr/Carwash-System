import { User } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import { UserObjectUpdateSchema } from "@/lib/definitions";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";

// Obtener usuario por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(User, params);
}

// Actualizar usuario
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: User,
        params: params,
        request: request,
        validationSchema: UserObjectUpdateSchema,
    });
}

// Eliminar usuario
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(User, params);
}