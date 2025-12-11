import { Model, ModelStatic } from "sequelize";

const findModelInDB = async <M extends Model>(model: ModelStatic<M>, uniqueField: string, validatedData: any) => {
    const isModelInDB = await model.findOne({
        where: {
            [uniqueField]: (validatedData as any)[uniqueField],
        } as any,
        paranoid: false
    });

    return isModelInDB;
}

export default findModelInDB;