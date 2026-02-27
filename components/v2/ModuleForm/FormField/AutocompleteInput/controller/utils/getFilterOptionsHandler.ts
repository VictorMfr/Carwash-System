import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { ComponentProps } from "react";
import { Autocomplete, createFilterOptions } from "@mui/material";

const filter = createFilterOptions<any>();

export default function getFilterOptionsHandler(field: formVanilla) {
    const func: ComponentProps<typeof Autocomplete>['filterOptions'] = (options, state) => {
        
        if (!field.autocomplete) return [];

        const filtered = filter(options, state);

        const searchField = field.autocomplete.searchField ?? 'name';
        const isExisting = options.some((option: any) => option?.[searchField] === state.inputValue);
        
        if (state.inputValue !== '' && !isExisting) {
            if (!field.autocomplete.newItemLabel) {
                return filtered;
            }

            filtered.push({
                inputValue: state.inputValue,
                [searchField]: `${field.autocomplete.newItemLabel}: "${state.inputValue}"`,
            });
        }

        return filtered;
    }

    return func;
}