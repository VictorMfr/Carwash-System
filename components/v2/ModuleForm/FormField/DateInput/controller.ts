import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import getFieldState from "../utils/getFieldState";
import { useModuleFormContext } from "../../context";
import { Dayjs } from "dayjs";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";

export default function useDateInputController(field: formVanilla): { state: formStateField, onChange: (event: Dayjs | null) => void, effects: formEffectsField } {
    const { controls, formEffects } = useModuleFormContext();
    const { state, onChange, effects } = getFieldState(field, controls, formEffects);
    
    return { state, onChange, effects }
}