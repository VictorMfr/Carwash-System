import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import { useModuleFormContext } from "../../../../context";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import validateFields from "./utils/validateFields";

export default function useStepperActionsController() {
    const { controls, settings } = useModuleFormContext();

    const controlsStepper = controls as stepperFormStateControls;
    const settingsStepper = settings.fields as formStepper;

    const handleBack = () => {
        controlsStepper.stepper.setActiveStep(controlsStepper.stepper.activeStep - 1);
    }

    const handleNext = () => {
        const errors = validateFields(controlsStepper, settingsStepper);
        if (errors) return;
        
        controlsStepper.stepper.setActiveStep(controlsStepper.stepper.activeStep + 1);
    }

    const handleSubmit = () => {
        controlsStepper.stepper.onSubmit();
    }

    const isFirstStep = controlsStepper.stepper.activeStep === 0;
    const isLastStep = controlsStepper.stepper.activeStep === settingsStepper.steps.length - 1;

    return {
        handleBack,
        handleNext,
        handleSubmit,
        isFirstStep,
        isLastStep,
    }
}