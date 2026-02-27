import { useModuleFormContext } from "../../context";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";

export default function useStepperController() {
    const { controls, settings } = useModuleFormContext();
    

    return {
        controls: controls as stepperFormStateControls,
        settings: { ...settings, config: { ...settings.config, size: 12, flexDirection: 'column' as any } },
        stepperOrientation: (settings.fields as formStepper).orientation,
    }
}