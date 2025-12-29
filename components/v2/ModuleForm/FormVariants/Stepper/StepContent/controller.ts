import form from "@/types/v2/form/form";
import { useModuleFormContext } from "../../../context";
import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function useStepContentController(step: stepperStep, index: number) {
    
    const { settings, controls } = useModuleFormContext();
    
    const form: form = {
        config: {...step.config },
        contentType: settings.contentType,
        fields: step.fields,
    }

    const isActiveStep = (controls as stepperFormStateControls).stepper.activeStep === index;

    return {
        form,
        controls: controls as stepperFormStateControls, 
        isActiveStep,
    }
}