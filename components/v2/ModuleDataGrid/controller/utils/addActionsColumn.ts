import columns from "@/types/v2/datagrid/columns/columns";
import datagrid from "@/types/v2/datagrid/datagrid";
import Actions from "../../Actions/Actions";

export default function addActionsColumn(settings: datagrid, columns: columns[]) {
    
    const isCustomActions = settings.actions;
    const isDefaultActions = settings.config.delete;
    const isEditable = settings.config.edit;
    
    const isVisibleActionsColumn = isCustomActions || isDefaultActions || isEditable;

    return [...columns, {
        field: 'actions',
        headerName: 'Acciones',
        width: 150,
        renderCell: Actions,
    }];
}