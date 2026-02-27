import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { stepperStockFields } from "./fields/fields";

export const stockStep: stepperStep = {
    title: 'Datos del stock',
    description: 'Llena los campos para agregar un nuevo stock',
    fields: stepperStockFields,
    config: { spacing: 2 },
}