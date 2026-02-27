import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { ModuleFormContextType } from "../../../../../../context";
import getFormFields from "@/components/v2/ModuleForm/FormField/utils/getFormFields";
import form from "@/types/v2/form/form";
import getInitialFormEffectsState from "../../../../../../utils/getInitialFormEffectsState";
import getInitialStateValue from "@/components/v2/ModuleForm/utils/getInitialStateValue";


export default function swapFieldsEffect(field: formVanilla, moduleFormContext: ModuleFormContextType) {
    if (!field.switch || !field.switch.swapIds) return;

    let swapIds = [...field.switch.swapIds];
    const switchId = field.id;

    // Obtener los campos del formulario
    const fields = getFormFields(moduleFormContext.settings);

    // Devuelve un array de fields con los valores intercambiados sin modificar el switch
    const swappedFields = fields.map(field => {
        const swapRule = swapIds.find(swapId => swapId.id === field.id);
        if (swapRule) {
            swapIds = swapIds.map(swapId => {
                if (swapId.id === field.id) {
                    return {
                        id: swapRule.value.id,
                        value: field,
                    };
                }
                return swapId;
            })
            return swapRule.value;
        }

        return field;
    });

    // Adjuntar los cambios realizados al switch
    const newFields = swappedFields.map(field => {
        if (field.id == switchId) {
            return {
                ...field,
                switch: {
                    ...field.switch,
                    swapIds: swapIds,
                },
            }
        }

        return field;
    });

    // Actualizar los settings
    const newSettings: form = {
        ...moduleFormContext.settings,
        fields: newFields,
    }

    // Actualizar settings
    moduleFormContext.setSettings(newSettings);

    // Actualizar el formState, se debe mantener el valor de los campos que no cambiaron
    moduleFormContext.controls.setFormState(prev => {
        const newFormState = prev.map(state => {
            const newField = newFields.find(field => field.id === state.field);
            if (newField) {
                return {
                    ...state,
                    value: prev.find(prevState => prevState.field === newField.id)?.value,
                }
            }

            const fieldTarget = field.switch?.swapIds?.find(f => f.id == state.field);
            if (!fieldTarget) return state;

            return {
                field: fieldTarget.value.field,
                value: getInitialStateValue(fieldTarget.value as formVanilla),
                error: ''
            }
        });

        return newFormState;
    });

    // Actualizar el formEffects
    moduleFormContext.setFormEffects(getInitialFormEffectsState(newSettings));

}