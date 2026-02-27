import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { fields } from "./fields/fields";

export const metadataStep: stepperStep = {
    title: 'Metadatos del comentario',
    description: 'Metadatos del comentario',
    config: { spacing: 2 },
    fields: fields as any,
};
