import { Stack, Button } from "@mui/material";
import useStepperActionsController from "./controller/controller";

export default function StepperActions() {

    const controller = useStepperActionsController();

    return (
        <Stack direction="row" spacing={2}>
            {!controller.isFirstStep && <Button
                variant="contained"
                color="primary"
                onClick={controller.handleBack}
            >
                Anterior
            </Button>}
            {!controller.isLastStep && <Button
                variant="contained"
                color="primary"
                onClick={controller.handleNext}
                disabled={controller.isLastStep}
            >
                Siguiente
            </Button>}
            {controller.isLastStep && <Button
                variant="contained"
                color="primary"
                onClick={controller.handleSubmit}
            >
                Enviar
            </Button>}
        </Stack>
    )
}