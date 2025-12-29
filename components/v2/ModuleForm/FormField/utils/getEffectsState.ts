import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";

export default function getEffectsState(
    field: formVanilla, 
    formEffects: formEffectsField[]
): formEffectsField {
    const effects = formEffects.find(effect => effect.field === field.field);

    if (!effects) return { field: '@unknown' };

    return effects;
}