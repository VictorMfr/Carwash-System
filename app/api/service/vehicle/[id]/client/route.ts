import { NextRequest } from "next/server";
import { Vehicle } from "@/services/backend/models/associations";
import getModel from "@/lib/apiUtils/model/getModel";

// Obtener cliente por id de vehículo
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Vehicle, params, async (vehicle) => {
        return vehicle.Client;
    });
}


