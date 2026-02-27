import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import useFetch from "@/hooks/fetch/useFetch";
import getUrlWithQuery from "./controller/utils/getUrlWithQuery";
import getFieldState from "../utils/getFieldState";
import { useModuleFormContext } from "../../context";
import confirmCreationHandler from "./controller/utils/confirmCreationHandler";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import getEffectsState from "../utils/getEffectsState";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";

export interface AutocompleteInputContextType {
    field: formVanilla;
    state: formStateField;
    modal: ModalState;
    setModal: Dispatch<SetStateAction<ModalState>>;
    data: any[];
    loading: boolean;
    setData: Dispatch<SetStateAction<any[]>>;
    changeHandler: (event: any, newValue: any) => void;
    effects: formEffectsField;
}

const AutocompleteInputContext = createContext<AutocompleteInputContextType>({
    field: {} as formVanilla,
    state: {} as formStateField,
    modal: { open: false },
    setModal: () => { },
    data: [],
    loading: false,
    setData: () => { },
    changeHandler: () => { },
    effects: { field: '@unknown' },
});

export const useAutocompleteInputContext = () => useContext(AutocompleteInputContext);

export interface ModalState {
    open: boolean;
    inputValue?: string;
}

export function AutocompleteInputProvider({
    children,
    field
}: {
    children: React.ReactNode
    field: formVanilla;
}) {

    const [modal, setModal] = useState<ModalState>({ open: false });
    const { data, loading, setData } = useFetch(getUrlWithQuery(field));

    const { controls, formEffects } = useModuleFormContext();
    const { state, onChange } = getFieldState(field, controls, formEffects);

    const uiContext = useUIDisplayControls();

    const effects = getEffectsState(field, formEffects);
    const { field:_, ...saveEffects } = effects;

    const changeHandler = (event: any, newValue: any) => {
        const searchField = field.autocomplete?.searchField ?? 'name';
    
        const appendUnique = (list: any[], item: any) => {
            if (!item) return list;
            const hasId = item?.id !== undefined;
            const exists = list.some(opt =>
                (hasId && opt?.id === item?.id) ||
                opt?.[searchField] === item?.[searchField]
            );
            return exists ? list : [...list, item];
        };
    
        if (newValue?.inputValue) {
            if (field.autocomplete?.formData) {
                setModal({ open: true, inputValue: newValue.inputValue });
                return;
            }
    
            if (field.autocomplete?.confirm) {
                return confirmCreationHandler(field, uiContext, controls, newValue.inputValue, setData);
            }
        } else if (Array.isArray(newValue)) {
            const newItem = newValue.find((item: any) => item?.inputValue);
    
            if (newItem) {
                setModal({ open: true, inputValue: newItem.inputValue });
                return; // evita guardar el item temporal
            }
    
            return onChange(event, newValue);
        } else {
            if (field.autocomplete?.multiple) {
                const current = Array.isArray(state.value) ? state.value : [];
                const next = appendUnique(current, newValue);
                return onChange(event, next);
            }
    
            onChange(event, newValue);
        }
    };

    const payload = {
        state,
        field,
        modal,
        setModal,
        data,
        loading,
        setData,
        changeHandler,
        effects: { field: '@unknown', ...saveEffects },
    }

    return (
        <AutocompleteInputContext.Provider value={payload}>
            {children}
        </AutocompleteInputContext.Provider>
    );
}