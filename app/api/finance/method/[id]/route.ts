import { Method } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import { MethodObjectSchema } from "@/lib/definitions";

// Obtener método
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Method, params);
}

// Actualizar método
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Method,
        params,
        request,
        validationSchema: MethodObjectSchema,
    });
}

// Eliminar método
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Method, params);
}

