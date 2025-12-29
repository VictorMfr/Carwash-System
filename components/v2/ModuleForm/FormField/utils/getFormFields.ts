import form from "@/types/v2/form/form";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getFormFields(settings: form): formVanilla[] {
    if (Array.isArray(settings.fields)) {
        return settings.fields as formVanilla[];
    }

    return settings.fields.steps.flatMap(step => step.fields);
}