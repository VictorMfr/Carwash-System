import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { useModuleFormContext } from "../../../context";

import useFetch from "@/hooks/fetch/useFetch";
import getRenderInput from "./utils/getRenderInput";
import { ComponentProps } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import getFieldState from "../../utils/getFieldState";



export default function useAutocompleteInputController(field: formVanilla) {
    if (!field.autocomplete) return null;

    const { data, loading } = useFetch(field.autocomplete.url);

    const { controls, formEffects } = useModuleFormContext();
    const { state, onChange } = getFieldState(field, controls, formEffects);

    const renderInput = getRenderInput(field, state.error, field.headerName);

    const getOptionLabel: ComponentProps<typeof Autocomplete>['getOptionLabel'] = (option: any) => {
        if (!field.autocomplete) return '';
        return option[field.autocomplete.searchField] ?? '';
    }

    const additionalProps: any = { ...field.autocomplete }
    delete additionalProps.url;
    delete additionalProps.searchField;
    
    return {
        value: state.value,
        onChange,
        data,
        loading,
        safeProps: additionalProps,
        renderInput,
        getOptionLabel
    }
}