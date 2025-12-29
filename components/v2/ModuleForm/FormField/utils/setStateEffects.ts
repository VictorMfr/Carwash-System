import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";

export default function setStateEffects(
    state: formStateField, 
    formEffects: formEffectsField[]
): formStateField {
    

    const effects = formEffects.find(effect => effect.field === state.field);
    if (!effects) return state;

    const { field:_, ...rest } = effects;

    return {
        ...state,
        ...rest,
    }
}