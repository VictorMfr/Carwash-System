import { useModuleDataGridContext } from "../../../../context";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import askForDeletion from "@/components/v2/ModuleDataGrid/Actions/DefaultActions/DeleteAction/controller/utils/askForDeletion";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import getRowsToDelete from "./utils/getRowsToDelete";

export default function useBulkDeleteController() {

    const { rowsSelected, settings, setFetchData, fetchData } = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();

    const handleBulkDelete = () => {

        const idsToDelete = getRowsToDelete(rowsSelected, fetchData);

        askForDeletion(uiContext, async () => {
            try {
                uiContext.setLoading(true);
                await api.delete(settings.url, {
                    data: {
                        ids: idsToDelete
                    }
                });
                uiContext.setSnackbar({
                    open: true,
                    message: 'Items borrados correctamente',
                    severity: 'success'
                });
                setFetchData((prev: any) => prev.filter((item: any) => !idsToDelete.includes(item.id)));
            } catch (error) {
                handleApiError(error, uiContext);
                uiContext.setSnackbar({
                    open: true,
                    message: 'Error al borrar items',
                    severity: 'error'
                });
            } finally {
                uiContext.setLoading(false);
                uiContext.setAlert(prev => ({ ...prev, open: false }));
            }
        });
    }

    const isBulkDeleteEnabled = rowsSelected.ids.size > 0 || rowsSelected.type === 'exclude';

    return {
        handleBulkDelete,
        isBulkDeleteEnabled
    }
}