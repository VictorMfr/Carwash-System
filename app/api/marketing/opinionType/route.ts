import createModel from "@/lib/apiUtils/model/createModel";
import { NextRequest } from "next/server";
import OpinionType from "@/services/backend/models/service/client/feedback/opinionType";
import { OpinionTypeObjectSchema } from "@/lib/definitions";
import getModels from "@/lib/apiUtils/model/getModels";

// Crear tipo de opinión
export async function POST(request: NextRequest) {
    return await createModel({
        model: OpinionType,
        validationSchema: OpinionTypeObjectSchema,
        request: request,
    });
}


// Obtener tipos de opinión
export async function GET(request: NextRequest) {
    return await getModels(OpinionType);
}