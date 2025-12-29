import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { AutocompleteRenderInputParams } from "@mui/material";
import RenderInput from "../../RenderInput/RenderInput";

export default function getRenderInput(field: formVanilla, error: string, label: string) {
    
    if (!field.autocomplete) return () => null;

    if (field.autocomplete.renderInput) {
        return field.autocomplete.renderInput;
    }

    return (params: AutocompleteRenderInputParams) => RenderInput(
        params, 
        error, 
        label
    );
}