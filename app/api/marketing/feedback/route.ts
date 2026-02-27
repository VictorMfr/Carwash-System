import getModels from "@/lib/apiUtils/model/getModels";
import { NextRequest } from "next/server";
import { Client, Feedback } from "@/services/backend/models/associations";
import { handleServerError } from "@/lib/error";
import { NextResponse } from "next/server";

// Crear comentario
export async function POST(request: NextRequest) {
    try {
        const { client, description, category, opinionType } = await request.json();
        const feedback = await Feedback.create({
            description,
            category,
            opinionType,
        });

        await feedback.setClient(client.id);

        const json = feedback.toJSON();
        const response = { ...json, client: `${client.name} ${client.lastname}` };

        return NextResponse.json(response);
    } catch (error) {
        return handleServerError(error);
    }
}

// Obtener comentarios
export async function GET(request: NextRequest) {
    try {
        const feedbacks = await Feedback.findAll({
            include: [{ model: Client, as: 'Client' }]
        });

        const customResponse = feedbacks.map((feedback) => {
            const json = feedback.toJSON();

            return { ...json, client: `${feedback.Client.name} ${feedback.Client.lastname}` }
        });

        return NextResponse.json(customResponse);
    } catch (error) {
        return handleServerError(error);
    }
}