import { Button, DialogActions } from "@mui/material";
import useModalActionsController from "./controller/controller";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function Actions({ formControls }: { formControls: vanillaFormStateControls | stepperFormStateControls }) {

    const controller = useModalActionsController(formControls);

    if (!controller.isVanilla) return null;

    return (
        <DialogActions>
            <Button variant="text" color="primary" onClick={controller.handleCancel}>
                Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={controller.handleSubmit} loading={controller.submitLoading}>
                Enviar
            </Button>
        </DialogActions>
    )
}