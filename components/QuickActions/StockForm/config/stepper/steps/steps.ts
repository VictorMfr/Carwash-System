import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { stockStep } from "./stockStep/step";
import { financeStep } from "./financeStep/step";
import { pictureStep } from "./pictureStep/step";


export const steps: stepperStep[] = [
    stockStep,
    financeStep,
    pictureStep,
];