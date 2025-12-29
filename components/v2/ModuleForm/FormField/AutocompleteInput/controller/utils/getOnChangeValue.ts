import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getOnChangeValue(field: formVanilla, value: unknown) {
    if (!field.autocomplete) return null;

    if (typeof value === 'string') {
        return { [field.autocomplete.searchField]: value };
    }

    if (typeof value === 'object' && value !== null) {
        return value;
    }

    return null;
}