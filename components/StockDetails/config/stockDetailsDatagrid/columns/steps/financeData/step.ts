import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { fields } from "./fields/fields";
import zod from "zod";

const validation = zod.object({
    dollar_rate: zod.number('La tasa de cambio es requerida').min(1),
    bol_charge: zod.number('El monto en bolívares es requerido').min(1),
    dollar_charge: zod.number('El monto en dolares es requerido').min(1),
    charge_account: zod.object(undefined, 'La cuenta a cobrar es requerida'),
    method: zod.object(undefined, 'El método de cobro es requerido'),
}).partial();

export const financeDataStep: stepperStep = {
    title: 'Datos financieros',
    description: 'Datos financieros',
    config: { spacing: 2 },
    fields: fields as any,
    validation
}