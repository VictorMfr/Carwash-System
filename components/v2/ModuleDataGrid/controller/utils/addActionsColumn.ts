import columns from "@/types/v2/datagrid/columns/columns";
import datagrid from "@/types/v2/datagrid/datagrid";
import Actions from "../../Actions/Actions";

/**
 * Agrega dinámicamente una columna de acciones ('actions') a la grilla si existen acciones personalizadas (settings.actions),
 * si está habilitada la acción de eliminar (settings.config.delete) o si está habilitada la edición (settings.config.edit).
 * 
 * Si hay alguna de estas opciones, agrega al final del array de columnas una columna especial que desplegará los controles de acción por fila.
 * Si no hay acciones configuradas ni opciones de edición/eliminación disponibles, retorna solo las columnas originales sin modificaciones.
 * 
 * @param settings - Configuración del datagrid, puede incluir acciones personalizadas y opciones de edición/eliminación por fila.
 * @param columns - Array de columnas visibles en la grilla.
 * @returns Un nuevo array de columnas, agregando la columna de acciones si corresponde.
 * 
 * @example
 * // Sin acciones o edición habilitada:
 * addActionsColumn({ actions: undefined, config: {} }, [{ field: 'id' }, { field: 'name' }])
 * // => [{ field: 'id' }, { field: 'name' }]
 * 
 * // Con eliminación habilitada:
 * addActionsColumn({ actions: undefined, config: { delete: true } }, [{ field: 'id' }, { field: 'name' }])
 * // => [{ field: 'id' }, { field: 'name' }, { field: 'actions', ... }]
 * 
 * // Con acciones personalizadas:
 * addActionsColumn({ actions: [customAction], config: {} }, [{ field: 'id' }])
 * // => [{ field: 'id' }, { field: 'actions', ... }]
 */
export default function addActionsColumn(settings: datagrid, columns: columns[]) {
    
    const isCustomActions = settings.actions;
    const isDefaultActions = settings.config?.delete;
    const isEditable = settings.config?.edit;
    
    const isVisibleActionsColumn = !!(isCustomActions || isDefaultActions || isEditable);

    return isVisibleActionsColumn ? [...columns, {
        field: 'actions',
        headerName: 'Acciones',
        width: 150,
        renderCell: Actions,
    }] : columns;
}