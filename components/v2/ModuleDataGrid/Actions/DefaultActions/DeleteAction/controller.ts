import { useModuleDataGridContext } from "../../../context";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function useDeleteActionController(params: GridRenderCellParams) {
    
    const { settings } = useModuleDataGridContext();

    const deletable = !settings.config.delete?.hiddenAction;

    const handleDelete = () => {
        console.log('delete');
    }

    return {
        settings,
        deletable,
        handleDelete
    }
}