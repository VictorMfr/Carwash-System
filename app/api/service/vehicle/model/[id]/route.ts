import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import { ModelSchema } from "@/lib/definitions";
import { VehicleModel } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";

// Obtener modelo de vehículo por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(VehicleModel, params);
}

// Actualizar modelo de vehículo
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: VehicleModel,
        params,
        request,
        validationSchema: ModelSchema,
    });
}

// Eliminar modelo de vehículo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(VehicleModel, params);
}

