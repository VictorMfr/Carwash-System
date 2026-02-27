import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";

/**
 * Esta funcion se encarga de obtener el payload del formulario
 * ya sea application/json, application/x-www-form-urlencoded o multipart/form-data
 */
export default function getPayload(
    datagridCtx: ReturnType<typeof useModuleDataGridContext>,
    modalType: ReturnType<typeof useModuleDataGridContext>['modalState']['type'],
    formData: Record<string, any>
) {
    let contentType;

    if (modalType === 'add') {
        contentType = datagridCtx.settings.config?.create?.contentType;
    } else {
        contentType = datagridCtx.settings.config?.edit?.contentType;
    }

    if (contentType === 'application/json' || contentType === 'application/x-www-form-urlencoded') {
        return formData;
    } else if (contentType === 'multipart/form-data') {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            // Preserve files, stringify plain objects so backend can JSON.parse.
            if (value instanceof File || value instanceof Blob) {
                payload.append(key, value);
                return;
            }

            if (typeof value === 'object') {
                payload.append(key, JSON.stringify(value));
                return;
            }

            payload.append(key, value as any);
        });
        return payload;
    }
}