import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import { useState } from "react";
import getInitialFormState from "./getFormState/getInitialFormState";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function useGetFormStateControls(fields: formVanilla[] | formStepper, config?: {
    onSubmit: () => void;
    onCancel: () => void;
}): vanillaFormStateControls | stepperFormStateControls {
    const initialFormState = getInitialFormState(fields);
    const [formState, setFormState] = useState<formStateField[]>(initialFormState);

    const [activeStep, setActiveStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    
    if (Array.isArray(fields)) {
        const controls: vanillaFormStateControls = {
            formState,
            setFormState,
        }
        return controls;
    }

    const controls: stepperFormStateControls = {
        formState,
        setFormState,
        stepper: {
            activeStep,
            setActiveStep,
            loading,
            onSubmit: config?.onSubmit ?? (() => {}),
            onCancel: config?.onCancel ?? (() => {}),
        }
    }

    return controls;

}