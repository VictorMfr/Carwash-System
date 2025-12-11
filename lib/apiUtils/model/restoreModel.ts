import { NextResponse } from "next/server";
import createHandler from "../createHandler";
import findModelInDB from "../findModelInDB";
import { CreateModelParams } from "./createModel";

export interface RestoreModelParams extends CreateModelParams<any> {
    validatedData: any;
}

const restoreModel = async (params: RestoreModelParams) => {
    const isModelInDB = await findModelInDB(
        params.model,
        params.uniqueField ?? '',
        params.validatedData
    );

    // Si no existe ningún registro con ese campo único, simplemente creamos
    if (!isModelInDB) {
        return createHandler(
            params.model,
            params.validatedData,
            params.postCreate ?? (async (_validatedData, createdModel) => createdModel),
            params.preCreate ?? (async (validatedData) => validatedData)
        );
    }

    // Si existe, intentamos restaurarlo (si es un modelo paranoico será un restore real;
    // si no, será un no-op). En cualquier caso devolvemos el modelo existente.
    if ((isModelInDB as any).restore) {
        try {
            await (isModelInDB as any).restore();
        } catch {
            // Si por alguna razón no se puede restaurar, igualmente devolvemos el modelo
        }
    }

    return NextResponse.json(isModelInDB);
}

export default restoreModel;

