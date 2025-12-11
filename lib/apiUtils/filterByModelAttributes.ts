import { Model, ModelStatic } from "sequelize";

// Tiene que devolver el tipo de los atributos del modelo
function filterByModelAttributes <T extends Model> (model: ModelStatic<T>, data: { [key: string]: any }): T {
    const attributes = Object.keys(model.getAttributes());
    return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => 
            attributes.includes(key) && value !== undefined && value !== null
        )
    ) as T;
}

export default filterByModelAttributes;