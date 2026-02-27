import { UIDisplayControlsContextType } from "@/hooks/UIDisplayControlsProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";

const alertTitle = 'Borrar';
const alertMessage = '¿Estás seguro de querer borrar este item?';
const alertSeverity = 'warning';

export default function askForDeletion(
    uiContext: UIDisplayControlsContextType,
    confirmCallback: () => Promise<void> 
) {
    uiContext.setAlert({
        open: true,
        title: alertTitle,
        message: alertMessage,
        severity: alertSeverity,
        actions: [
            {
                label: 'Cancelar',
                onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
            },
            {
                label: 'Borrar',
                onClick: confirmCallback
            }
        ]
    })
}