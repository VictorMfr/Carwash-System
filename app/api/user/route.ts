import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import deleteModels from "@/lib/apiUtils/model/deleteModels";

// Crear usuario
export async function POST(request: NextRequest) {
    return await createModel({
        model: User,
        validationSchema: UserObjectCreateSchema,
        request: request,
        uniqueField: 'email',
        preCreate: async (validatedData) => {
            const hashedPassword = await bcrypt.hash(validatedData.password as string, 10);
            validatedData.password = hashedPassword;
            return validatedData;
        }
    });
}

// Obtener usuarios
export async function GET() {
    return await getModels(User);
}

// Eliminar usuarios
export async function DELETE(request: NextRequest) {
    return await deleteModels(User, request);
}