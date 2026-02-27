import { ComponentProps } from "react";
import { Autocomplete } from "@mui/material";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getOptionLabelFunc (field: formVanilla) {
    const func: ComponentProps<typeof Autocomplete>['getOptionLabel'] = (option: any) => {
        if (!field.autocomplete) return '';
        
        if (!field.autocomplete.searchField) throw new Error('searchField is required');

        if (typeof option === 'string') {
            return option;
        }

        if (field.autocomplete.multiple) {
            return option[field.autocomplete.searchField ?? 'name'];
        }

        if (option.inputValue) {
            return option[field.autocomplete.searchField ?? 'name'] ?? option.name;
        }

        if (field.autocomplete.getOptionLabel) {
            return field.autocomplete.getOptionLabel(option);
        }

        if (Array.isArray(option) && option.length == 0) {
            return '';
        }

        return option[field.autocomplete.searchField];
    }

    return func;
}