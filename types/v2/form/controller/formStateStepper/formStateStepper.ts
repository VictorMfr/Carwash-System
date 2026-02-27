import vanillaFormStateControls from "../controller";
import formStateField from "../formStateField/formStateField";

export default interface stepperFormStateControls extends vanillaFormStateControls {
    stepper: {
        activeStep: number;
        setActiveStep: (step: number) => void;
        onSubmit: (formState: formStateField[]) => void;
        onCancel: () => void;
        loading: boolean;
        setLoading: (loading: boolean) => void;
    }
}