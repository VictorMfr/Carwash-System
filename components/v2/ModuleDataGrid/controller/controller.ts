import getColumns from "./utils/getColumns";
import filterColumns from "./utils/filterColumns";
import addActionsColumn from "./utils/addActionsColumn";
import { useModuleDataGridContext } from "../context";
import Slots from "../Slots/Slots";
import { GridRowSelectionModel } from "@mui/x-data-grid";

/**
 * Hook para el controlador de la grilla.
 * @returns Hook para el controlador de la grilla.
 */
export default function useModuleDataGridController() {

    // Obtener el contexto de la grilla.
    const datagridCtx = useModuleDataGridContext();

    const rawColumns = getColumns(datagridCtx.settings.columns);
    const columns = filterColumns(rawColumns);
    const columnsWithActions = addActionsColumn(datagridCtx.settings, columns);

    const handleRowSelectionModelChange = (newSelectionModel: GridRowSelectionModel) => {
        datagridCtx.setRowsSelected(newSelectionModel);
    }

    return {
        data: datagridCtx.fetchData,
        loading: datagridCtx.fetchLoading,
        columns: columnsWithActions,
        slots: Slots(),
        customDataGridProps: datagridCtx.settings.config,
        setData: datagridCtx.setFetchData,
        handleRowSelectionModelChange,
    } 
}