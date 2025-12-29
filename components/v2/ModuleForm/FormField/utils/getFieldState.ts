import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { Autocomplete, SelectChangeEvent } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { ChangeEvent, ComponentProps } from "react";
import getOnChangeValue from "../AutocompleteInput/controller/utils/getOnChangeValue";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";
import setStateEffects from "./setStateEffects";

export default function getFieldState(
    field: formVanilla, 
    controls: vanillaFormStateControls,
    formEffects: formEffectsField[]
) {
    const stateWithoutEffects = controls.formState.find(state => state.field === field.id);
    
    if (!stateWithoutEffects) return {
        state: {
            field: '@unknown',
            value: '',
            error: '',
        },
        onChange: () => {},
    }

    const state = setStateEffects(stateWithoutEffects, formEffects);

    const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        controls.setFormState(controls.formState.map(state => state.field === field.id ? { ...state, value: event.target.value } : state));
    }

    const onChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
        controls.setFormState(controls.formState.map(state => state.field === field.id ? { ...state, value: Number(event.target.value) } : state));
    }

    const onChangeSelect = (event: SelectChangeEvent<string>) => {
        controls.setFormState(controls.formState.map(state => state.field === field.id ? { ...state, value: event.target.value } : state));
    }

    const onChangeDate = (event: PickerValue | null) => {
        if (!event) return;
        
        const errorValue = event.isValid() ? '' : 'La fecha no es válida';

        controls.setFormState(controls.formState.map(state => (
            state.field === field.id ? {
                ...state,
                value: event.format('DD-MM-YYYY'),
                error: errorValue
            } : state
        )));
    }

    const onChangeAutocomplete: ComponentProps<typeof Autocomplete>['onChange'] = (event, value) => {
        const onChangeValue = getOnChangeValue(field, value);
        controls.setFormState(controls.formState.map(state => state.field === field.id ? { ...state, value: onChangeValue } : state));
    }

    const onChangeSwitch = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        controls.setFormState(controls.formState.map(state => state.field === field.id ? { ...state, value: checked } : state));
    }

    
    // Definir el onChange dependiendo del tipo de campo
    if (field.number) {
        return { state, onChange: onChangeNumber };
    }

    if (field.select) {
        return { state, onChange: onChangeSelect };
    }

    if (field.date) {
        return { state, onChange: onChangeDate };
    }

    if (field.autocomplete) {
        return { state, onChange: onChangeAutocomplete };
    }

    if (field.switch) {
        return { state, onChange: onChangeSwitch };
    }

    const returnValue = {
        state,
        onChange: onChangeText,
    }

    return returnValue as any;
}