import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import { steps } from "./steps/steps";

export const stepper: formStepper = {
    title: 'Registrar producto',
    orientation: 'vertical',
    config: { spacing: 2 },
    steps,
};