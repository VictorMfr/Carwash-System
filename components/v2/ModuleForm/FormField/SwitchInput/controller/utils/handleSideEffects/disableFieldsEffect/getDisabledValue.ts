import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { ModuleFormContextType } from "../../../../../../context";
import SwitchDisableRule from "@/types/v2/input/switch/disableRule/disableRule";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function getDisabledValue(
    effectField: string, 
    field: formVanilla, 
    moduleFormContext: ModuleFormContextType
) {
    // Debe buscar entre los disableIds el campo que coincida con el effectField
    const disableId = field.switch?.disableIds?.find(disableId => disableId.id === effectField);
    
    // Si no se encuentra el campo, se retorna null
    if (!disableId) return null;
    
    // Si se encuentra el campo, se retorna el valor
    return disableId.value;
}