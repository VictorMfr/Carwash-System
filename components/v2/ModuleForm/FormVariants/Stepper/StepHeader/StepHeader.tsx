import { Step, StepLabel } from "@mui/material";
import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";

export default function StepHeader({ step, ...other }: { step: stepperStep }) {
    return (
        <Step key={step.title} {...other}>
            <StepLabel>{step.title}</StepLabel>
        </Step>
    );
}