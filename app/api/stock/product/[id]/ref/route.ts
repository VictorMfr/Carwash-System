import { NextRequest } from "next/server";
import { Product } from "@/services/backend/models/associations";
import getModel from "@/lib/apiUtils/model/getModel";

// Obtener stock en producto
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(Product, params, async (product) => {
        const stock = await product.getStock();
        return stock;
    });
}