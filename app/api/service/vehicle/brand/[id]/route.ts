import { VechileBrandSchema } from "@/lib/definitions";
import { VehicleBrand } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";

// Obtener marca de vehículo por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(VehicleBrand, params);
}

// Actualizar marca de vehículo
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: VehicleBrand,
        params,
        request,
        validationSchema: VechileBrandSchema,
    });
}

// Eliminar marca de vehículo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(VehicleBrand, params);
}

