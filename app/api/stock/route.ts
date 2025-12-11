import deleteModels from "@/lib/apiUtils/model/deleteModels";
import getModels from "@/lib/apiUtils/model/getModels";
import { handleServerError } from "@/lib/error";
import { decrypt, getSession } from "@/lib/session";
import { Product, Stock, StockDetails, User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Crear stock
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const product = data.product;
        const minimum_quantity = Number(data.minimum_quantity);

        if (!product || !minimum_quantity) {
            return NextResponse.json({ error: 'Product and minimum_quantity are required' }, { status: 400 });
        }

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 400 });
        }

        // Obtener id de usuario desde sesión
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 });
        }

        const decoded = await decrypt(session);

        if (!decoded) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        // Prevenir asociar un producto que ya tiene un inventario
        const existing = await Stock.findOne({
            include: [{ model: Product, as: 'Product', where: { id: product.id } }]
        });
        if (existing) {
            return NextResponse.json({ error: 'Este inventario ya existe' }, { status: 400 });
        }

        const stock = await Stock.create({
            total_quantity: 0,
            minimum_quantity
        });

        await stock.setProduct(product.id);
        await stock.setUser(user.id);

        // Retornar el stock con el producto y el usuario
        const formatted = {
            ...stock.toJSON(),
            product: product.name,
            unit: product.unit,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        return handleServerError(error);
    }
}

// Obtener stocks
export async function GET() {
    return await getModels(Stock, {
        include: [{
            model: Product,
            as: 'Product',
            attributes: ['name', 'unit'],
        }, {
            model: StockDetails,
            as: 'StockDetails',
            attributes: ['quantity'],
        }]
    }, async (stocks: Stock[]) => {
        return stocks.map((s: Stock) => {
            const json: any = s.toJSON();
            return {
                ...json,
                product: json.Product.name,
                unit: json.Product.unit,
            }
        });
    });
}

// Eliminar stocks
export async function DELETE(request: NextRequest) {
    return await deleteModels(Stock, request);
}
