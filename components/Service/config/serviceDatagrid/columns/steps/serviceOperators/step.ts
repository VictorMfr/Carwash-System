import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { ServiceVehicleObjectSchemaStepTwo } from "@/lib/definitions";
import { fields } from "./fields/fields";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const serviceOperatorsStep: stepperStep = {
    title: 'Servicio y operadores',
    description: 'Servicio y operadores',
    config: { spacing: 2 },
    fields: fields as formVanilla[],
    validation: ServiceVehicleObjectSchemaStepTwo,
};
