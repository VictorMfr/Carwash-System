import { NextResponse } from "next/server";
import { Model, ModelStatic } from "sequelize";
import { formDataAttributes } from "./types";
import filterByModelAttributes from "./filterByModelAttributes";

const createHandler = async <M extends Model>(
    model: ModelStatic<M>,
    validatedData: any,
    postCreate?: (validatedData: formDataAttributes, model: M) => Promise<any>,
    preCreate?: (validatedData: formDataAttributes) => Promise<any>,
) => {
    let dataToCreate = validatedData;
    if (preCreate) {
        const result = await preCreate(validatedData);
        // Si preCreate retorna algo, usarlo; si no, usar validatedData (que puede haber sido modificado por referencia)
        dataToCreate = result !== undefined ? result : validatedData;
    }

    const filteredDataToCreate = filterByModelAttributes(model, dataToCreate);

    // Crear el modelo
    const createdModel = await model.create(filteredDataToCreate as any);

    // Ejecutar postCreate si existe
    if (postCreate) {
        const result = await postCreate(validatedData, createdModel);
        return NextResponse.json(result);
    }

    return NextResponse.json(createdModel);
}

export default createHandler;