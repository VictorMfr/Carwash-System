import { ClientObjectSchema } from "@/lib/definitions";
import { Client, Vehicle } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear cliente
export async function POST(request: NextRequest) {
    return await createModel({
        model: Client,
        validationSchema: ClientObjectSchema,
        request,
        uniqueField: 'phone',
    });
}

// Obtener clientes
export async function GET() {
    return await getModels(Client, {
        include: [
            { model: Vehicle, as: 'Vehicles' }
        ]
    }, async (client) => {
        const response = client.map((client) => {
            return {
                ...client.toJSON(),
                vehicles: client.Vehicles.map((vehicle) => vehicle.license_plate)
            }
        });
        return response;
    });
}

// Eliminar clientes
export async function DELETE(request: NextRequest) {
    return await deleteModels(Client, request);
}

