import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { ServiceVehicleObjectSchemaStepFour } from "@/lib/definitions";
import { fields } from "./fields/fields";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const chargeRateStep: stepperStep = {
    title: 'Cobros y tasa',
    description: 'Cobros y tasa',
    config: { spacing: 2 },
    fields: fields as formVanilla[],
    validation: ServiceVehicleObjectSchemaStepFour,
};
