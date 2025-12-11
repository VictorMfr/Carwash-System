import { handleServerError } from "@/lib/error";
import { Model, ModelStatic } from "sequelize";
import createHandler from "../createHandler";
import { ZodSchema } from "zod";
import { NextRequest } from "next/server";
import { formDataAttributes } from "../types";
import getJsonFromRequest from "../getJSONFromRequest";
import restoreModel from "./restoreModel";



export interface CreateModelParams<M extends Model> {
    /**
     * Modelo a utilizar.
     */
    model: ModelStatic<M>;
    /**
     * Esquema de validación para los datos del modelo.
     */
    validationSchema: ZodSchema;
    /**
     * Request del usuario.
     */
    request: NextRequest;
    /**
     * Si el modelo tiene un campo único, se restaura el modelo si existe,
     * buscando por el campo único. Recuerda que es estan haciendo
     * soft delete, por lo que el modelo nunca se eliminara de la 
     * base de datos completamente. SOLO UTILIZARLO SI NO SE PRETENDE
     * RESTAURAR UN MODELO
     */
    uniqueField?: string;
    /**
     * Función opcional que se ejecuta antes de validar los datos.
     * Útil para transformar payloads (ej. procesar FormData) antes del esquema Zod.
     */
    preValidate?: (data: formDataAttributes, request: NextRequest) => Promise<formDataAttributes | void>;
    /**
     * Función que se ejecuta después de crear el modelo.
     */
    postCreate?: (validatedData: any, model: M) => Promise<any>;
    /**
     * Función que se ejecuta antes de crear el modelo.
     */
    preCreate?: (validatedData: formDataAttributes) => Promise<any>;
}

const createModel = async <M extends Model>(
    params: CreateModelParams<M>
) => {
    try {
        // Obtenemos el JSON tal cual llega (sin filtrar por atributos de modelo).
        // El filtrado, en caso de ser necesario, se hace más adelante en createHandler.
        let data = await getJsonFromRequest(params.request);

        if (params.preValidate) {
            const transformedData = await params.preValidate(data, params.request);
            data = transformedData !== undefined ? transformedData : data;
        }

        const validatedData = params.validationSchema.parse(data);

        if (params.uniqueField) {
            return await restoreModel({ ...params, validatedData });
        }

        return await createHandler(
            params.model,
            validatedData,
            params.postCreate,
            params.preCreate
        );

    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

export default createModel;