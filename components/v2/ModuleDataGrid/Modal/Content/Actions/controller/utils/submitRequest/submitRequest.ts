import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";
import api from "@/lib/axios";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import getContentHeader from "./getContentHeader";
import getPayload from "./getPayload";

/**
 * Esta funcion se encarga de enviar los datos del formulario a la API,
 * administrando casos como:
 * - Creacion (POST)
 * - Actualizacion (PUT)
 * - Tipos de formatos de contenido (multipart/form-data, application/json, application/x-www-form-urlencoded)
 */
export default async function submitRequest(
    datagridCtx: ReturnType<typeof useModuleDataGridContext>,
    formData: Record<string, any>
) {
    const modalType = datagridCtx.modalState.type;
    const url = datagridCtx.settings.url;

    const contentHeader = getContentHeader(datagridCtx, modalType);
    const payload = getPayload(datagridCtx, modalType, formData);

    try {
        // Verificar si es una creacion
        if (modalType === 'add') {
            const response = await api.post(
                url, 
                payload,
                contentHeader 
            );
            return response.data;
        } else {
            // Asumir que es una actualizacion
            const id = Array.isArray(datagridCtx.modalState.data)
                ? datagridCtx.modalState.data.find((field: formStateField) => field.field === 'id')?.value
                : undefined;
            return (await api.put(`${datagridCtx.settings.url}/${id}`, payload, contentHeader)).data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}