import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function getFormData(
    formControls: vanillaFormStateControls | stepperFormStateControls | formStateField[]
): Record<string, any> {
    const formData: Record<string, any> = {};

    if (Array.isArray(formControls)) {
        formControls.forEach(field => {
            formData[field.field] = field.value;
        });
    } else {
        formControls.formState.forEach(field => {
            formData[field.field] = field.value;
        });
    }


    return formData;
}