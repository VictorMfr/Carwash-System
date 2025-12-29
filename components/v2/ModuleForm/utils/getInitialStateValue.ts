import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getInitialStateValue(field: formVanilla) {
    if (field.switch) {
        return false;
    }

    if (field.number || field.date || field.autocomplete) {
        return null;
    }

    return '';
}