import { User } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Obtener usuario por id
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}

// Actualizar usuario
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { name, lastname, email, phone, address, role } = await request.json();
        const { id } = await params;
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await user.update({ name, lastname, email, phone, address, role });
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}

// Eliminar usuario
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await user.destroy();
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}