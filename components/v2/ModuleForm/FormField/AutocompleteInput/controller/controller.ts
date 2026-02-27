import getRenderInput from "./utils/getRenderInput";
import getOptionLabelFunc from "./utils/getOptionLabelFunc";
import getFilterOptionsHandler from "./utils/getFilterOptionsHandler";
import { useAutocompleteInputContext } from "../context";

const pick = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]) =>
    Object.fromEntries(keys.map(key => [key, obj[key]])) as Pick<T, K>;

export default function useAutocompleteInputController() {
    
    const autocompleteCtx = useAutocompleteInputContext();

    if (!autocompleteCtx.field.autocomplete) return null;

    const renderInput = getRenderInput(autocompleteCtx.field, autocompleteCtx.state.error, autocompleteCtx.field.headerName);
    const getOptionLabel = getOptionLabelFunc(autocompleteCtx.field);
    const filterOptionsHandler = getFilterOptionsHandler(autocompleteCtx.field);

    const allowedProps: (keyof typeof autocompleteCtx.field.autocomplete)[] = [
        'autoComplete',
        'clearOnBlur',
        'disableClearable',
        'disabled',
        'filterOptions',
        'freeSolo',
        'getOptionLabel',
        'groupBy',
        'isOptionEqualToValue',
        'loading',
        'multiple',
        'onChange',
        'openOnFocus',
        'options',
        'renderInput',
        'renderOption',
        'value',
    ];

    const additionalProps: any = pick(autocompleteCtx.field.autocomplete, allowedProps);

    return {
        autocompleteCtx,
        value: autocompleteCtx.state.value,
        onChange: autocompleteCtx.changeHandler,
        data: autocompleteCtx.data,
        loading: autocompleteCtx.loading,
        safeProps: additionalProps,
        renderInput,
        getOptionLabel,
        filterOptionsHandler,
        error: autocompleteCtx.state.error,
        modal: autocompleteCtx.modal,
        setModal: autocompleteCtx.setModal,
        setData: autocompleteCtx.setData,
    }
}