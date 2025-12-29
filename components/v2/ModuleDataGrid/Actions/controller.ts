import datagrid from "@/types/v2/datagrid/datagrid";
import { useModuleDataGridContext } from "../context";

export default function useActionsController() {
    const { settings } = useModuleDataGridContext();

    return {
        actions: settings.actions,
    }
}