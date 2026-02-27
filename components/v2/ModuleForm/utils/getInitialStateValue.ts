import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getInitialStateValue(field: formVanilla) {
    if (field.switch) {
        return field.switch.checked ?? false;
    }

    if (field.autocomplete) {
        return field.autocomplete.multiple ? [] : null;
    }

    if (field.cart) {
        return [];
    }

    if (field.number || field.date) {
        return null;
    }

    return '';
}