import updateModel from "@/lib/apiUtils/model/updateModel";
import { FailureObjectSchema } from "@/lib/definitions";
import Failure from "@/services/backend/models/stock/failure";
import { NextRequest } from "next/server";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import getModel from "@/lib/apiUtils/model/getModel";
import { StockDetails } from "@/services/backend/models/associations";

// Obtener falla por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Failure, params);
}

// Actualizar falla
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Failure,
        params,
        request,
        validationSchema: FailureObjectSchema,
        afterUpdate: async (model: Failure) => {
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
}

// Eliminar falla
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await deleteModel(Failure, params);
}

