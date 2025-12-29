import { useModuleFormContext } from "../../../../context";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function useVerticalStepperController() {
    const { settings, controls } = useModuleFormContext();

    return {
        settings: settings.fields as formStepper,
        controls: controls as stepperFormStateControls,
        contentType: settings.contentType,
    }
}