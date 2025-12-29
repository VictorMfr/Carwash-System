import { handleServerError } from "@/lib/error";
import { FindOptions, Model, ModelStatic } from "sequelize";
import { NextResponse } from "next/server";

const getModels = async <M extends Model>(
    model: ModelStatic<M>, 
    findOptions?: FindOptions<M>,
    afterFind?: (results: M[]) => Promise<any>,
) => {
    try {
        const models = await model.findAll(findOptions);
        if (afterFind) {
            const afterFindModels = await afterFind(models);
            return NextResponse.json(afterFindModels);
        }
        return NextResponse.json(models);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

export default getModels;
