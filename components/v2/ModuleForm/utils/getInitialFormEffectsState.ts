import form from "@/types/v2/form/form";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";
import getFormType from "../controller/utils/getFormType";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";

export default function getInitialFormEffectsState(form: form): formEffectsField[] {
    if (getFormType(form) === 'vanilla') {
        return (form.fields as formVanilla[]).map(field => ({
            field: field.field,
        }));
    }

    return (form.fields as formStepper).steps.flatMap(step => step.fields).map(field => ({
        field: field.field,
    }));
}