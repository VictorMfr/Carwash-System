import { handleServerError } from "@/lib/error";
import { Model, ModelStatic } from "sequelize";
import { NextResponse } from "next/server";

const deleteModel = async <M extends Model>(
    model: ModelStatic<M>, 
    params: Promise<{ id: string }>,
    /**
     * Función opcional que se ejecuta después de eliminar el modelo.
     * Recibe el modelo eliminado (soft delete o hard delete, según la config del modelo)
     * y su resultado será el que se devuelva en la respuesta si se proporciona.
     */
    afterDelete?: (model: M) => Promise<any>,
) => {
    try {
        const { id } = await params;
        const md = await model.findByPk(id);
        await (md as M).destroy();

        if (afterDelete) {
            const afterDeleteModel = await afterDelete(md as M);
            return NextResponse.json(afterDeleteModel);
        }

        return NextResponse.json(md);
    } catch (error) {
        return handleServerError(error);
    }
}

export default deleteModel;