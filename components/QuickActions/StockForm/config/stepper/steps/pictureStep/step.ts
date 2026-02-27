import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { pictureStepFields } from "./fields/fields";

export const pictureStep: stepperStep = {
    title: 'Agrega una imagen',
    description: 'Agrega una imagen al stock',
    fields: pictureStepFields,
    config: { spacing: 2 },
};
