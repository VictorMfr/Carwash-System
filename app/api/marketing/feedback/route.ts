import createModel from "@/lib/apiUtils/model/createModel";
import getModels from "@/lib/apiUtils/model/getModels";
import { NextRequest } from "next/server";
import { FeedbackObjectSchema } from "@/lib/definitions";
import { Client, Feedback, Category, OpinionType } from "@/services/backend/models/associations";
import { handleServerError } from "@/lib/error";

// Crear comentario
export async function POST(request: NextRequest) {
    console.log('VALOR DE LA PETICIÓN: ' + JSON.stringify(request.body));
    return await createModel({
        model: Feedback,
        validationSchema: FeedbackObjectSchema,
        request: request,
        postCreate: async (validatedData: any, model: Feedback) => {
            if (!validatedData.client?.id) throw new Error('El cliente es requerido');
            if (!validatedData.category?.id) throw new Error('La categoría es requerida');
            if (!validatedData.opinionType?.id) throw new Error('El tipo de opinión es requerido');

            await model.setClient(validatedData.client.id);
            await model.setCategory(validatedData.category.id);
            await model.setOpinionType(validatedData.opinionType.id);

            const clientField = await model.getClient();
            const categoryField = await model.getCategory();
            const opinionTypeField = await model.getOpinionType();

            return {
                id: model.id,
                client: `${clientField.name} ${clientField.lastname}`,
                category: categoryField.name,
                opinionType: opinionTypeField.name,
                description: model.description,
            };
        }
    });
}

// Obtener comentarios
export async function GET(request: NextRequest) {
    try {
        return await getModels(Feedback, {
            include: [
                {
                    model: Client,
                    as: 'Client',
                },
                {
                    model: Category,
                    as: 'Category',
                },
                {
                    model: OpinionType,
                    as: 'OpinionType',
                },
            ]
        }, async (feedbacks: Feedback[]) => {
            return feedbacks.map((feedback: Feedback) => {
                return {
                    ...feedback.toJSON(),
                    id: feedback.id,
                    client: `${feedback.Client.name} ${feedback.Client.lastname}`,
                    category: feedback.Category.name,
                    opinionType: feedback.OpinionType.name,
                    description: feedback.description,
                };
            });
        });
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }

}