import { User } from "@/services/backend/models/associations";
import { AssignRolesSchema } from "@/lib/definitions";
import getModel from "@/lib/apiUtils/model/getModel";

// Obtener roles de usuario
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(User, params, async (user) => {
        const roles = await user.getRoles();
        return roles;
    });
}

// Actualizar roles de usuario
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return await getModel(User, params, async (user) => {
        const body = await request.json();
        const { roles } = AssignRolesSchema.parse(body);
        await user.setRoles(roles.map(role => Number(role)));
        return user;
    });
}