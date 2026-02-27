import { User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { decrypt, getSession } from "@/lib/session";
import { handleServerError } from "@/lib/error";

// Obtener usuario actual desde la sesión
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let payload: { userId: string };
        try {
            payload = await decrypt(session);
        } catch {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        const user = await User.findByPk(payload.userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const response = {
            ...user.toJSON(),
        };

        return NextResponse.json(response);
    } catch (error) {
        return handleServerError(error);
    }
}
