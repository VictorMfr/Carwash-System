import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";
import { AxiosRequestConfig } from "axios";

/**
 * Esta funcion se encarga de obtener el tipo de contenido del formulario
 * ya sea application/json, application/x-www-form-urlencoded o multipart/form-data
 */
export default function getContentHeader(
    datagridCtx: ReturnType<typeof useModuleDataGridContext>,
    intention: ReturnType<typeof useModuleDataGridContext>['modalState']['type']
): AxiosRequestConfig<Record<string, any>> {

    if (intention === 'add') {
        return {
            headers: {
                'Content-Type': datagridCtx.settings.config?.create?.contentType,
            }
        }
    } else {
        return {
            headers: {
                'Content-Type': datagridCtx.settings.config?.edit?.contentType,
            }
        }
    }
}