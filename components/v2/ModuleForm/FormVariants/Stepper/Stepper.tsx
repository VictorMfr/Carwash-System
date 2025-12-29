import useStepperController from "./controller";
import VerticalStepper from "./StepperVariants/Vertical/VerticalStepper";
import HorizontalStepper from "./StepperVariants/Horizontal/HorizontalStepper";
import { Grid } from "@mui/material";

export default function Stepper() {

    const controller = useStepperController();

    return (
        <Grid container size={12}>
            {controller.stepperOrientation === 'vertical' && <VerticalStepper />}
            {controller.stepperOrientation === 'horizontal' && <HorizontalStepper />}
        </Grid>
    )
}