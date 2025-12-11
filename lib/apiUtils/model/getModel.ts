import { NextResponse } from "next/server";
import { Model, ModelStatic } from "sequelize";
import { FindOptions } from "sequelize";
import { handleServerError } from "@/lib/error";

const getModel = async <M extends Model>(
    model: ModelStatic<M>,
    params: Promise<{ id: string }>,
    afterFind?: (model: M) => Promise<any>,
    options?: {
        findOptions?: FindOptions<M>;
    },
) => {
    try {
        const { id } = await params;
        const md = await model.findByPk(id, options?.findOptions);
        if (afterFind) {
            const afterFindModel = await afterFind(md as M);
            return NextResponse.json(afterFindModel);
        }
        return NextResponse.json(md);
    } catch (error) {
        return handleServerError(error);
    }
}

export default getModel;