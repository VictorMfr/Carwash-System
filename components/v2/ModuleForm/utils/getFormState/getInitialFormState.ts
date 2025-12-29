import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import getInitialStateValue from "../getInitialStateValue";

export default function getInitialFormState(
    fields: formVanilla[] | formStepper,
    keepValues?: boolean
): formStateField[] {
    // Si fields es un array, significa que es un formVanilla
    if (Array.isArray(fields)) {
        return fields.map(field => ({
            field: field.field,
            value: getInitialStateValue(field),
            error: '',
        }));
    }

    // Si fields es un formStepper, significa que es un formStepper
    return fields.steps.flatMap(step => step.fields).map(field => ({
        field: field.field,
        value: getInitialStateValue(field),
        error: '',
    }));
}