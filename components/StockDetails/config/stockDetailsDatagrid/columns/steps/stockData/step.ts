import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { fields } from "./fields/fields";
import zod from "zod";

const validation = zod.object({
    quantity: zod.number('La cantidad es requerida').min(1),
    entryDate: zod.string('La fecha de entrada es requerida').min(1),
    brand: zod.object(undefined, 'La marca es requerida'),
    state: zod.object(undefined, 'El estado es requerido'),
}).partial();

export const stockDataStep: stepperStep = {
    title: 'Datos del stock',
    description: 'Datos del stock',
    config: { spacing: 2 },
    fields: fields as any,
    validation
}