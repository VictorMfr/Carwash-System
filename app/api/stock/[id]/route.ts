
import Product from "@/services/backend/models/stock/product";
import { NextResponse } from "next/server";
import { deleteUploadFile } from "@/lib/pictures";
import { Stock } from "@/services/backend/models/associations";

// Actualizar stock
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { minimum_quantity } = await request.json();
        if (minimum_quantity === undefined || minimum_quantity === null) {
            return NextResponse.json({ error: 'minimum_quantity is required' }, { status: 400 });
        }
        const stock = await Stock.findByPk(id);
        if (!stock) return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        await stock.update({ minimum_quantity });
        const reloaded = await Stock.findByPk(id, { include: [{ model: Product, as: 'Product' }] });
        const json: any = reloaded ? (reloaded as any).toJSON() : stock.toJSON();
        const product = json.product ?? json.Product ?? null;
        const flattened = {
            ...json,
            product: product?.name ?? null,
            unit: product?.unit ?? null,
        };
        return NextResponse.json(flattened);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating stock' }, { status: 500 });
    }
}

// Eliminar stock
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Obtener el id del stock
        const { id } = await params;

        // Encontrar el stock
        const stock = await Stock.findByPk(id);
        if (!stock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        // Obtener todos los detalles de stock
        const stockDetails = await stock.getStockDetails();

        // Eliminar todos los detalles de stock
        for (const detail of stockDetails) {
            await detail.destroy();

            // Eliminar la imagen
            if (detail.picture) {
                await deleteUploadFile(detail.picture);
            }
        }

        // Eliminar el stock
        await stock.destroy();

        return NextResponse.json({ message: 'Stock deleted successfully' });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting stock' }, { status: 500 });
    }
}

// Obtener stock por id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const stock = await Stock.findByPk(id, { include: [{ model: Product, as: 'Product' }] });
        return NextResponse.json(stock);
    } catch (error) {
        return NextResponse.json({ error: 'Error getting stock' }, { status: 500 });
    }
}