import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { useModuleFormContext } from "../../context";
import getFieldState from "./getFieldState";
import getEffectsState from "./getEffectsState";


export default function useTextInputController(field: formVanilla) {
    const { controls, formEffects } = useModuleFormContext();
    const { state, onChange } = getFieldState(field, controls, formEffects);
    const effects = getEffectsState(field, formEffects);

    const { field:_, ...rest } = effects;

    return {
        state,
        onChange,
        effects: rest,
    }
}