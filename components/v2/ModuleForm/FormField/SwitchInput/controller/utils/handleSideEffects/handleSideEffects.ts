import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import disableFieldsEffect from "./disableFieldsEffect/disableFieldsEffect";
import swapFieldsEffect from "./swapFieldsEffect/swapFieldsEffect";
import { ModuleFormContextType } from "../../../../../context";

export default function handleSideEffects(
    field: formVanilla,
    moduleFormContext: ModuleFormContextType
) {
    if (!field.switch) return;
    
    // 1. Desactivar los campos
    if (field.switch.disableIds) {
        disableFieldsEffect(field, moduleFormContext);
    }

    // 2. Intercambiar los campos
    if (field.switch.swapIds) {
        swapFieldsEffect(field, moduleFormContext);
    }
}