import { ModelObjectSchema } from "@/lib/definitions";
import { VehicleModel } from "@/services/backend/models/associations";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import { NextRequest } from "next/server";

// Crear modelo de vehículo
export async function POST(request: NextRequest) {
    return await createModel({
        model: VehicleModel,
        validationSchema: ModelObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener modelos de vehículo
export async function GET() {
    return await getModels(VehicleModel);
}

// Eliminar modelos de vehículo
export async function DELETE(request: NextRequest) {
    return await deleteModels(VehicleModel, request);
}

