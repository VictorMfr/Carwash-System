import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import { useModuleFormContext } from "../../../../context";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";

export default function useHorizontalStepperController() {
    
    const { settings, controls } = useModuleFormContext();

    return {
        settings: settings.fields as formStepper,
        controls: controls as stepperFormStateControls,
    }
}