import vanillaFormStateControls from "../controller";

export default interface stepperFormStateControls extends vanillaFormStateControls {
    stepper: {
        activeStep: number;
        setActiveStep: (step: number) => void;
        onSubmit: () => void;
        onCancel: () => void;
        loading: boolean;
    }
}