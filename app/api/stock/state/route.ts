import { StateObjectSchema } from "@/lib/definitions";
import { State } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear estado
export async function POST(request: NextRequest) {
    return await createModel({
        model: State,
        validationSchema: StateObjectSchema,
        request: request,
        uniqueField: 'name',
    });
}

// Obtener estados
export async function GET() {
    return await getModels(State);
}

// Eliminar estados
export async function DELETE(request: NextRequest) {
    return await deleteModels(State, request);
}

