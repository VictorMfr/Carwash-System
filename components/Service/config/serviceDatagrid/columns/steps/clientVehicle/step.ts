import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { ServiceVehicleObjectSchemaStepOne } from "@/lib/definitions";
import { fields } from "./fields/fields";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const clientVehicleStep: stepperStep = {
    title: 'Cliente y vehículo',
    description: 'Cliente y vehículo',
    config: { spacing: 2 },
    fields: fields as formVanilla[],
    validation: ServiceVehicleObjectSchemaStepOne,
};
