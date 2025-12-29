import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function validateFields(controls: stepperFormStateControls, settings: formStepper) {
    const activeStep = controls.stepper.activeStep;
    const step = settings.steps[activeStep];
    const validation = step.validation;

    const fieldsToValidate = controls.formState.filter(field => step.fields.some(f => f.field === field.field));

    if (!validation) return;

    // Validate fields
    const result = validation.safeParse(fieldsToValidate);

    if (!result.success) {

        console.log('Result: ', result);

        const formStateWithErrors = result.error.issues.map(issue => ({
            field: issue.path[0] as string,
            value: controls.formState.find(field => field.field === issue.path[0])?.value,
            error: issue.message
        }));

        console.log('Errors: ', formStateWithErrors);

        controls.setFormState(prev => {
            return prev.map(field => {
                const error = formStateWithErrors.find(error => error.field === field.field);
                return {
                    ...field,
                    error: error?.error ?? field.error
                }
            });
        });
        return true;
    }

    return false;
}