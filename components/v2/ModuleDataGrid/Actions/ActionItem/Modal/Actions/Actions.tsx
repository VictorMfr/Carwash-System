import { Button, DialogActions } from "@mui/material";
import useModalActionsController from "./controller";

export default function Actions() {

    const controller = useModalActionsController();

    return (
        <DialogActions>
            <Button
                variant="text"
                color="primary"
                onClick={controller.handleClose}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={controller.handleSubmit}
                loading={controller.submitLoading}
            >
                Enviar
            </Button>
        </DialogActions>
    )
}