import useFetch from "@/hooks/fetch/useFetch";
import getColumns from "./utils/getColumns";
import filterColumns from "./utils/filterColumns";
import addActionsColumn from "./utils/addActionsColumn";
import { useModuleDataGridContext } from "../context";
import Slots from "../Slots/Slots";


export default function useModuleDataGridController() {
    const { settings } = useModuleDataGridContext();
    const { data, loading } = useFetch(settings.url);

    const rawColumns = getColumns(settings.columns);
    const columns = filterColumns(rawColumns);
    const columnsWithActions = addActionsColumn(settings, columns);

    return {
        data,
        loading,
        columns: columnsWithActions,
        slots: Slots(),
        checkboxSelection: settings.config?.allowCheckboxSelection,
        customDataGridProps: settings.config?.customDataGridProps,
    } 
}