import { VechileBrandObjectSchema } from "@/lib/definitions";
import { VehicleBrand } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear marca de vehículo
export async function POST(request: NextRequest) {
    return await createModel({
        model: VehicleBrand,
        validationSchema: VechileBrandObjectSchema,
        request,
        uniqueField: 'name',
    });
}

// Obtener marcas de vehículo
export async function GET() {
    return await getModels(VehicleBrand);
}

// Eliminar marcas de vehículo
export async function DELETE(request: NextRequest) {
    return await deleteModels(VehicleBrand, request);
}

