import Failure from "@/services/backend/models/stock/failure";
import { NextResponse } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import { FailureObjectSchema } from "@/lib/definitions";
import { NextRequest } from "next/server";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import getModels from "@/lib/apiUtils/model/getModels";
import { Stock, Product, StockDetails } from "@/services/backend/models/associations";
import { col } from "sequelize";

// Crear falla
export async function POST(request: NextRequest) {
    try {
        return await createModel({
            model: Failure,
            validationSchema: FailureObjectSchema,
            request: request,
            preCreate: async (data: any) => {
                const stockDetailId = data?.stockDetail?.id;
                return {
                    description: data.description,
                    resolved: Boolean(data.resolved),
                    StockDetailId: stockDetailId,
                };
            },
            postCreate: async (_validated: any, model: Failure) => {
                // Obtener el stock detail desde el modelo creado
                const stockDetailId = (model as any).get?.('StockDetailId') ?? (model as any).StockDetailId;
                const stockDetail = await StockDetails.findByPk(stockDetailId);
                const stock = await stockDetail?.getStock();
                const product = await stock?.getProduct();

                return {
                    id: model.id,
                    description: model.description,
                    resolved: model.resolved,
                    picture: stockDetail?.picture,
                    stockDetail: stockDetailId ? { id: stockDetailId, name: product?.name } : undefined
                };

            }
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating failure' }, { status: 500 });
    }
}

// Obtener fallas
export async function GET(request: Request) {
    try {
        const failures = await Failure.findAll({
            attributes: [
                'id',
                'description',
                'resolved',
                [col('StockDetail.picture'), 'picture']
            ],
            include: [
                { 
                    model: StockDetails, 
                    as: 'StockDetail',
                    include: [{ 
                        model: Stock, 
                        as: 'Stock', 
                        include: [{ 
                            model: Product, 
                            as: 'Product',
                            where: { isTool: true } 
                        }] 
                    }] 
                }
            ],
        });

        return NextResponse.json(failures.map((failure: Failure) => {
            return {
                ...failure.toJSON(),
                stockDetail: failure.StockDetail?.Stock?.Product
            };
        }));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting failures' }, { status: 500 });
    }
}

// Eliminar fallas
export async function DELETE(request: NextRequest) {
    return await deleteModels(Failure, request);
}
