import { NextRequest, NextResponse } from "next/server";
import { Model, ModelStatic, Op } from "sequelize";
import { handleServerError } from "@/lib/error";
import getJsonFromRequest from "../getJSONFromRequest";

const deleteModels = async <M extends Model>(
    model: ModelStatic<M>, 
    request: NextRequest,
    /**
     * Función opcional que se ejecuta después de eliminar múltiples modelos.
     * Recibe los modelos obtenidos antes de la eliminación (útil para logs, auditoría, etc.).
     * Si se proporciona, su resultado será el que se devuelva en la respuesta.
     */
    afterDelete?: (models: M[]) => Promise<any>,
) => {
    try {
        const body = await getJsonFromRequest(request) as { ids: string[] };
        const { ids } = body;

        // Obtener los modelos antes de eliminar (para poder usarlos en afterDelete)
        const modelsToDelete = await model.findAll({
            where: { id: { [Op.in]: ids } } as any,
            paranoid: false,
        });

        await model.destroy({ where: { id: { [Op.in]: ids } } } as any);

        if (afterDelete) {
            const afterDeleteResult = await afterDelete(modelsToDelete as M[]);
            return NextResponse.json(afterDeleteResult);
        }

        return NextResponse.json({ message: 'Models deleted successfully' });
    } catch (error) {
        return handleServerError(error);
    }
}

export default deleteModels;

