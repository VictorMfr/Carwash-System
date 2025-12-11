import { VehicleWithUserSchema } from "@/lib/definitions";
import { Vehicle } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener vehículo por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Vehicle, params);
}

// Actualizar vehículo
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Vehicle,
        params,
        request,
        validationSchema: VehicleWithUserSchema,
    });
}

// Eliminar vehículo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Vehicle, params);
}

