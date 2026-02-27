import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { ModuleFormContextType } from "../../../../../../context";
import getDisabledValue from "./getDisabledValue";

export default function disableFieldsEffect(field: formVanilla, moduleFormContext: ModuleFormContextType) {
    if (!field.switch || !field.switch.disableIds) return;

    const disableIds = field.switch.disableIds;

    const fieldsToDisable = moduleFormContext.controls.formState.filter(field => {
        return disableIds.some(disableId => disableId.id === field.field)
    });

    const getFields = fieldsToDisable.map(field => field.field);

    const valuesToSet: Record<string, any> = {};
    const newFormEffects = moduleFormContext.formEffects.map(effect => {
        if (getFields.includes(effect.field)) {
            
            // Si el campo ya estaba desactivado, se debe activar
            if (effect.disabled) {
                const { disabled, value, ...rest } = effect
                return { ...rest }
            }

            // Si el campo no estaba desactivado, se debe desactivar
            const value = getDisabledValue(effect.field, field, moduleFormContext);
            const newEffect = {
                ...effect,
                disabled: true, 
                value // Se intenta llenar el valor del campo con el valor de la switch si existe
            };

            if (value !== null && value !== undefined) {
                valuesToSet[effect.field] = value;
                return newEffect;
            }

            return { ...effect, disabled: true };
        }
        return effect;
    });

    moduleFormContext.setFormEffects(newFormEffects);

    if (Object.keys(valuesToSet).length > 0) {
        moduleFormContext.controls.setFormState(prev =>
            prev.map(state =>
                Object.prototype.hasOwnProperty.call(valuesToSet, state.field)
                    ? { ...state, value: valuesToSet[state.field], error: '' }
                    : state
            )
        );
    }
}