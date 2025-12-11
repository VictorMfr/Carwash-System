import { handleServerError } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import getJsonFromRequest from "../getJSONFromRequest";
import { ZodSchema } from "zod";
import { Model, ModelStatic } from "sequelize";

export interface UpdateModelParams<M extends Model> {
    model: ModelStatic<M>;
    params: Promise<{ id: string }>;
    request: NextRequest;
    validationSchema: ZodSchema;
    /**
     * Función opcional que se ejecuta después de actualizar el modelo.
     * Si se proporciona, su resultado será el que se devuelva en la respuesta.
     */
    afterUpdate?: (model: M) => Promise<any>;
}

const updateModel = async <M extends Model>({
    model,
    params,
    request,
    validationSchema,
    afterUpdate,
}: UpdateModelParams<M>) => {
    try {
        const { id } = await params;
        const body = await getJsonFromRequest(request);
        const validatedData = validationSchema.parse(body);
        const md = await model.findByPk(id);
        if (!md) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        const updatedModel = await md.update(validatedData as any);

        if (afterUpdate) {
            const afterUpdateModel = await afterUpdate(updatedModel as M);
            return NextResponse.json(afterUpdateModel);
        }

        return NextResponse.json(updatedModel);
    } catch (error) {
        return handleServerError(error);
    }
}

export default updateModel;