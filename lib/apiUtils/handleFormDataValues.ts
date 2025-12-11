import dayjs from "dayjs";
import { formDataAttributes } from "./types";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const handleType = (value: FormDataEntryValue) => {
    if (typeof value === 'string') {
        try { 
            const jsn = JSON.parse(value);
            return jsn;
        } catch {};
        
        if (value === 'true' || value === 'false') {
            return value === 'true';
        }

        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }

        // Verificar si es una fecha
        if (value.includes('-') && value.split('-').length === 3) {
            const [day, month, year] = value.split('-');
            return new Date(Number(year), Number(month) - 1, Number(day));
        }

        return value;
    }

    // Mantener los archivos tal cual (File/Blob) para procesarlos después
    if (value instanceof Blob) {
        return value;
    }

    return value;
}

const handleFormDataValues = (formData: FormData): formDataAttributes => {
    const data: formDataAttributes = {};

    for (const [key, value] of formData.entries()) {
        data[key] = handleType(value);
    }

    return data;
};

export default handleFormDataValues;