import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { fields } from "./fields/fields";

export const contentStep: stepperStep = {
    title: 'Contenido del comentario',
    description: 'Contenido del comentario',
    config: { spacing: 2 },
    fields: fields as any,
};
