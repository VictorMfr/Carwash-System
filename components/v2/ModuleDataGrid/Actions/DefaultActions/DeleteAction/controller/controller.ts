import { useModuleDataGridContext } from "../../../../context";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import askForDeletion from "./utils/askForDeletion";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useDeleteActionController(params: GridRenderCellParams) {
    
    const { settings, setFetchData } = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();

    const deletable = settings?.config?.delete;
    if (deletable && deletable.hiddenAction) return { deletable: false, handleDelete: () => {} }

    const handleDelete = () => {
        askForDeletion(uiContext, async () => {
            try {
                uiContext.setLoading(true);
                await api.delete(`${settings.url}/${params.row.id}`);
                setFetchData((prev: any) => prev.filter((item: any) => item.id !== params.row.id));
                uiContext.setSnackbar({ 
                    open: true, 
                    message: 'Item borrado correctamente', 
                    severity: 'success' 
                });
                uiContext.setAlert(prev => ({ ...prev, open: false }));
            } catch (error) {
                handleApiError(error, uiContext);
            } finally {
                uiContext.setLoading(false);
            }
        });
    }

    return {
        settings,
        deletable,
        handleDelete
    }
}