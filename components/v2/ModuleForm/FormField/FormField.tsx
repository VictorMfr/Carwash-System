import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import TextInput from "./TextInput/TextInput";
import Number from "./NumberInput/NumberInput";
import SelectInput from "./SelectInput/SelectInput";
import DateInput from "./DateInput/DateInput";
import AutocompleteInput from "./AutocompleteInput/AutocompleteInput";
import SwitchInput from "./SwitchInput/SwitchInput";

export default function FormField({ field }: { field: formVanilla }) {

    if (field.date) {
        return <DateInput field={field} />
    }

    if (field.select) {
        return <SelectInput field={field} />
    }

    if (field.number) {
        return <Number field={field} />
    }

    if (field.autocomplete) {
        return <AutocompleteInput field={field} />
    }

    if (field.switch) {
        return <SwitchInput field={field} />
    }
    
    return <TextInput field={field} />
}