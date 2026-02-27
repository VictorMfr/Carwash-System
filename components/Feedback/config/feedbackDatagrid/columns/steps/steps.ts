import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { metadataStep } from "./metadata/step";
import { contentStep } from "./content/step";

export const steps: stepperStep[] = [
    metadataStep,
    contentStep,
];
