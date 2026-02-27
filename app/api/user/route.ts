import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import { handleServerError } from "@/lib/error";

// Crear usuario
export async function POST(request: NextRequest) {
    try {
        const { name, lastname, email, phone, address, password, role } = await request.json();

        const deletedUser = await User.findOne({ where: { email }, paranoid: false });
        
        if (deletedUser) {
            if (deletedUser.isSoftDeleted()) {
                const restoredUser = await deletedUser.restore();
                
                deletedUser.name = name;
                deletedUser.lastname = lastname;
                deletedUser.phone = phone;
                deletedUser.address = address;
                deletedUser.role = role;
                await deletedUser.save();

                return NextResponse.json(restoredUser);
            } else {
                return NextResponse.json({ error: 'User already exists' }, { status: 400 });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, lastname, email, phone, address, password: hashedPassword, role });
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}

// Obtener usuarios
export async function GET() {
    try {
        const users = await User.findAll();

        const usersWithoutAdmin = users.filter(user => user.id !== 1);

        const response = usersWithoutAdmin.map(user => {
            return {
                ...user.toJSON(),
            }
        });
        
        return NextResponse.json(response);
    } catch (error) {
        return handleServerError(error);
    }
}

// Eliminar usuarios
export async function DELETE(request: NextRequest) {
    return await deleteModels(User, request);
}