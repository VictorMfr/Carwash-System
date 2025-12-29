import { GridRenderCellParams } from "@mui/x-data-grid";
import { useModuleDataGridContext } from "../../../context";

export default function useUpdateActionController(params: GridRenderCellParams) {
    const { settings } = useModuleDataGridContext();

    const editable = !settings.config.edit?.hiddenAction;

    return {
        handleUpdate: () => {
            console.log('update');
        },
        editable
    }
}