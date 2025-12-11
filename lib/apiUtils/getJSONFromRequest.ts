import { NextRequest } from "next/server";
import handleFormDataValues from "./handleFormDataValues";
import { formDataAttributes } from "./types";
import { Model, ModelStatic } from "sequelize";
import filterByModelAttributes from "./filterByModelAttributes";

const getJsonFromRequest = async (
    request: NextRequest,
    model?: ModelStatic<Model>
): Promise<{ [key: string]: any }> => {
    const contentType = request.headers?.get("content-type");
    
    let data: formDataAttributes = {};

    if (contentType?.startsWith("multipart/form-data")) {
        const formData = await request.formData();
        data = handleFormDataValues(formData);
    } else {
        data = await request.json();
    }

    if (model) {
        return filterByModelAttributes(model, data);
    }

    return data;
};

export default getJsonFromRequest;
