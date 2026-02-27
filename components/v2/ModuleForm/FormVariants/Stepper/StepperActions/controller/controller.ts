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

    const handleSubmit = async () => {
        controlsStepper.stepper.setLoading(true);
        try {
            await Promise.resolve(controlsStepper.stepper.onSubmit(controlsStepper.formState));
        } finally {
            controlsStepper.stepper.setLoading(false);
        }
    }

    const isFirstStep = controlsStepper.stepper.activeStep === 0;
    const isLastStep = controlsStepper.stepper.activeStep === settingsStepper.steps.length - 1;
    const submitLoading = controlsStepper.stepper.loading;

    return {
        handleBack,
        handleNext,
        handleSubmit,
        isFirstStep,
        isLastStep,
        submitLoading,
    }
}