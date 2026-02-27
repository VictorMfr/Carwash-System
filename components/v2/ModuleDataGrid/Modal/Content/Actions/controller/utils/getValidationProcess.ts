import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";

/**
 * Obtiene el proceso de validacion del formulario
 * 
 * @param datagridCtx - El contexto del datagrid
 * @returns El proceso de validacion del formulario, puede ser de create o edit
*/
export default function getValidationProcess(
    datagridCtx: ReturnType<typeof useModuleDataGridContext>
) {
    if (!datagridCtx.settings.config) return null;

    const isCreate = datagridCtx.modalState.type === 'add';
    const isEdit = datagridCtx.modalState.type === 'edit';

    if (isCreate) {
        if (!datagridCtx.settings.config.create) return null;

        return datagridCtx.settings.config.create.validation ?? null;
    }

    if (isEdit) {
        if (!datagridCtx.settings.config.edit) return null;
        return datagridCtx.settings.config.edit.validation ?? null;
    }

    return null;
}