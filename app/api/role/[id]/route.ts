// Actualizar rol
import { NextRequest } from "next/server";
import { Role } from "@/services/backend/models/associations";
import updateModel from "@/lib/apiUtils/model/updateModel";
import { RoleObjectSchema } from "@/lib/definitions";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return await updateModel({
        model: Role,
        params,
        request,
        validationSchema: RoleObjectSchema,
    });
}