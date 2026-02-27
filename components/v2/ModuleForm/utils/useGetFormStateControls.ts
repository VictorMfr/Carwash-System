import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import { useEffect, useState } from "react";
import getInitialFormState from "./getFormState/getInitialFormState";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function useGetFormStateControls(fields: formVanilla[] | formStepper, config?: {
    onSubmit: (formState: formStateField[]) => void;
    onCancel: () => void;
}, initialState?: formStateField[]
): vanillaFormStateControls | stepperFormStateControls {
    const initialFormState = initialState ?? getInitialFormState(fields);
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
            setLoading,
            onSubmit() {
                config?.onSubmit?.(formState);
            },
            onCancel() {
                config?.onCancel?.();
            },
        }
    }

    return controls;

}