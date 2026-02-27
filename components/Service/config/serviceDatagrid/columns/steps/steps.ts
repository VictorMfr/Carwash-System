import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { clientVehicleStep } from "./clientVehicle/step";
import { serviceOperatorsStep } from "./serviceOperators/step";
import { chargeRateStep } from "./chargeRate/step";

export const steps: stepperStep[] = [
    clientVehicleStep,
    serviceOperatorsStep,
    chargeRateStep,
];
