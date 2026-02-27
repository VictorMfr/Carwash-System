import { Service, Recipe, Operator, Vehicle, StockDetails, Client } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import updateModel from "@/lib/apiUtils/model/updateModel";
import { StatusObjectSchema } from "@/lib/definitions";


// Obtener servicio
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const service = await Service.findByPk(id, {
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle' },
                { model: StockDetails, as: 'StockDetails' }
            ]
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        

        const response = {
            ...service.toJSON(),
            recipeName: { name: service.Recipe?.name, products: service.StockDetails },
        }

        
        return NextResponse.json(response);
    } catch (error) {
        return handleServerError(error);
    }
}

// Actualizar servicio
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Service,
        params,
        request,
        validationSchema: StatusObjectSchema,
        afterUpdate: async (model) => {
            const reloadedModel = await model.reload({
                include: [
                    { model: Recipe, as: 'Recipe' },
                    { model: Operator, as: 'Operators' },
                    { model: Vehicle, as: 'Vehicle', include: [{ model: Client, as: 'Client' }] },
                    { model: StockDetails, as: 'StockDetails' }
                ]
            });

            const json = reloadedModel.toJSON() as any;

            return {
                ...json,
                recipeName: {
                    name: json.Recipe?.name ?? '',
                    products: json.StockDetails ?? [],
                },
                dollar_rate: json.dollar_rate,
                bol_charge: json.bol_charge,
                // Derive dollar_charge for the client (read-only)
                dollar_charge: json.dollar_rate ? Number(json.bol_charge) / Number(json.dollar_rate) : null,
                status: json.status,
                vehicleLicensePlate: json.Vehicle?.license_plate,
                client: `${json.Vehicle?.Client?.name ?? ''} ${json.Vehicle?.Client?.lastname ?? ''}`.trim(),
                operators: json.Operators?.map((op: any) => ({
                    id: op.id,
                    name: op.name,
                    lastname: op.lastname,
                    phoneNumber: op.phone,
                    address: op.address,
                })) || [],
            };
        }
    });
}

// Eliminar servicio
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const service = await Service.findByPk(id);

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        await service.destroy();
        return NextResponse.json({ success: true });
    } catch (error) {
        return handleServerError(error);
    }
}
