import { MethodObjectSchema } from "@/lib/definitions";
import { Method } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear método
export async function POST(request: NextRequest) {
    return await createModel({
        model: Method,
        validationSchema: MethodObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener métodos
export async function GET() {
    return await getModels(Method);
}

// Eliminar métodos
export async function DELETE(request: NextRequest) {
    return await deleteModels(Method, request);
}

