import { Stepper, Grid, Step, StepLabel } from "@mui/material";
import useHorizontalStepperController from "./controller";
import StepContent from "../../StepContent/StepContent";
import StepperActions from "../../StepperActions/StepperActions";

export default function HorizontalStepper() {

    const controller = useHorizontalStepperController();

    return (
        <Grid container {...controller.settings.config} flexDirection={'column'}>
            <Stepper
                activeStep={controller.controls.stepper.activeStep}
                orientation={'horizontal'}
            >
                {controller.settings.steps.map((step) => (
                    <Step key={step.title}>
                        <StepLabel>{step.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container size={12}>
                {controller.settings.steps.map((step, index) => (
                    <StepContent key={step.title} step={step} index={index} />
                ))}
            </Grid>
            <StepperActions />
        </Grid>
    );
}