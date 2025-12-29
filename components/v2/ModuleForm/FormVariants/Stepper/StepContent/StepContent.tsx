import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { Box, Grid } from "@mui/material";
import ModuleForm from "../../..";
import useStepContentController from "./controller";

export default function StepContent({ step, index }: { step: stepperStep, index: number }) {
    
    const controller = useStepContentController(step, index);

    if (!controller.isActiveStep) return null;
    
    return (
        <Grid key={step.title} size={12}>
            <ModuleForm
                settings={controller.form}
                controls={controller.controls}
            />
        </Grid>
    )
}