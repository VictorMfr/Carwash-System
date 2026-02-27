import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { useModuleFormContext } from "../../../context";
import getFieldState from "../../utils/getFieldState";
import { ChangeEvent, useEffect } from "react";
import handleSideEffects from "./utils/handleSideEffects/handleSideEffects";

export default function useVanillaSwitchController(field: formVanilla) {
    if (!field.switch) return null;

    const moduleFormContext = useModuleFormContext();
    const { state } = getFieldState(field, moduleFormContext.controls, moduleFormContext.formEffects);

    const { disableIds, swapIds, ...props } = field.switch;    

    const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        moduleFormContext.controls.setFormState(moduleFormContext.controls.formState.map(state => state.field === field.id ? { ...state, value: checked } : state));
        handleSideEffects(field, moduleFormContext);
    }

    useEffect(() => {
        if (state.value) {
            handleSideEffects(field, moduleFormContext);
        }
    }, []);

    return {
        state,
        onChange,
        props,
    };
}