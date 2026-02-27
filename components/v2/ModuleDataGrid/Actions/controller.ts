import { useModuleDataGridContext } from "../context";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function useActionsController(params: GridRenderCellParams) {
    const { settings } = useModuleDataGridContext();
    
    const action = null

    return {
        action,
        actions: settings.actions,
    }
}