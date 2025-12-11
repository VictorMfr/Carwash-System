import { Product, Stock } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import createModel from "@/lib/apiUtils/model/createModel";
import { ProductObjectSchema } from "@/lib/definitions";
import { NextRequest } from "next/server";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear producto
export async function POST(request: NextRequest) {
    return await createModel({
        model: Product,
        validationSchema: ProductObjectSchema,
        request: request,
        uniqueField: 'name',
    });
}

// Obtener productos
export async function GET(request: Request) {
    try {
        // Obtener parámetros de consulta
        const { searchParams } = new URL(request.url);
        const withoutInventory = searchParams.get('withoutInventory');

        if (withoutInventory) {
            const products = await Product.findAll();

            const stocks = await Stock.findAll({
                include: [
                    {
                        model: Product,
                        as: 'Product'
                    }
                ]
            });

            const productsWithoutInventory = products.filter((product) => !stocks.some((stock) => stock.Product.id === product.id));
            return NextResponse.json(productsWithoutInventory);
        } else {
            const products = await Product.findAll();
            return NextResponse.json(products);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting products' }, { status: 500 });
    }
}

// Eliminar productos
export async function DELETE(request: NextRequest) {
    return await deleteModels(Product, request);
}
