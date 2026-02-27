import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import getFieldsToValidate from "@/components/v2/ModuleForm/FormVariants/Stepper/StepperActions/controller/utils/getFieldsToValidate";

export default function validateFields(controls: stepperFormStateControls, settings: formStepper) {
    const activeStep = controls.stepper.activeStep;
    const step = settings.steps[activeStep];
    const validation = step.validation;

    const fieldsToValidate = getFieldsToValidate(step, controls.formState);
    
    if (!validation) return;

    // Convertir [{...}] a {field: value, field: value, ...}
    const formValue = fieldsToValidate.reduce((acc, field) => {
        acc[field.field] = field.value;
        return acc;
    }, {} as Record<string, string | number | boolean | Record<string, any> | any[] | null>);


    // Validar campos solo con los keys activos
    const validationSchema = "partial" in validation && typeof validation.partial === "function"
        ? validation.partial()
        : validation;
    const result = validationSchema.safeParse(formValue);

    if (!result.success) {

        const formStateWithErrors = result.error.issues.map((issue: { path: (string | number)[]; message: string }) => ({
            field: issue.path[0] as string,
            value: controls.formState.find(field => field.field === issue.path[0])?.value,
            error: issue.message
        }));

        console.log('Errors: ', formStateWithErrors);

        controls.setFormState(prev => {
            return prev.map(field => {
                const error = formStateWithErrors.find((error: { field: string }) => error.field === field.field);
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