import { Vehicle, VehicleBrand, VehicleModel, Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { handleServerError } from "@/lib/error";
import { Attributes } from "sequelize";

export interface POSTVehiclePayload {
    license_plate: string;
    brand: Attributes<VehicleBrand>;
    model: Attributes<VehicleModel>;
    client: Attributes<Client>;
}

// Crear vehículo
export async function POST(request: Request) {
    try {
        const payload: POSTVehiclePayload = await request.json();

        const vehicle = await Vehicle.create({
            license_plate: payload.license_plate,
            brandId: payload.brand.id,
            modelId: payload.model.id,
            clientId: payload.client.id,
        });

        const json = vehicle.toJSON();

        const response = {
            ...json,
            brand: payload.brand.name,
            model: payload.model.name,
            client: payload.client.name + ' ' + payload.client.lastname,
        }

        return NextResponse.json(response);

    } catch (error) {
        return handleServerError(error);
    }
}

// Obtener vehículos
export async function GET() {
    try {
        const vehicles = await Vehicle.findAll({
            include: [
                { model: VehicleModel, as: 'VehicleModel' },
                { model: VehicleBrand, as: 'VehicleBrand' },
                { model: Client, as: 'Client' }
            ]
        });


        const response = vehicles.map((vehicle) => {
            return {
                ...vehicle.toJSON(),
                brand: vehicle.VehicleBrand.name ?? 'N/A',
                model: vehicle.VehicleModel.name ?? 'N/A',
                client: vehicle.Client?.name + ' ' + vehicle.Client?.lastname,
            }
        });

        console.log(response)

        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting vehicles' }, { status: 500 });
    }
}

// Eliminar vehículos
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No vehicle IDs provided' }, { status: 400 });
        }

        // Normalizar ids a números y usar IN operator explícitamente para evitar диалектные особенности
        const normalizedIds = ids.map((id: string | number) => Number(id)).filter((n) => !Number.isNaN(n));
        if (normalizedIds.length === 0) {
            return NextResponse.json({ error: 'No valid vehicle IDs provided' }, { status: 400 });
        }

        const deletedCount = await Vehicle.destroy({
            where: { id: { [Op.in]: normalizedIds } },
        });

        return NextResponse.json({ message: `${deletedCount} vehicles deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting vehicles' }, { status: 500 });
    }
}

