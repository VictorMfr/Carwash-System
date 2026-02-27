import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { stockDataStep } from "./stockData/step";
import { financeDataStep } from "./financeData/step";
import { pictureStep } from "./picture/step";

export const steps: stepperStep[] = [
    stockDataStep,
    financeDataStep,
    pictureStep,
]