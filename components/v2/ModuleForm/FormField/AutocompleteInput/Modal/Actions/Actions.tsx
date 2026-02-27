import { Button, DialogActions } from "@mui/material";
import useAutocompleteInputModalController from "../controller";
import useModalActionsController from "./controller";

export default function Actions({
    controls,
}: {
    controls: ReturnType<typeof useAutocompleteInputModalController>;
}) {

    if (!controls || !controls.isStepper) return null;

    const controller = useModalActionsController(controls.controls);
    

    return (
        <DialogActions>
            <Button
                onClick={controls.handleCancel}
            >
                Cancelar
            </Button>
            <Button
                onClick={controller.handleSubmit}
                loading={controller.submitLoading}
            >
                Agregar
            </Button>
        </DialogActions>
    )
}