import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import TextInput from "./TextInput/TextInput";
import Number from "./NumberInput/NumberInput";
import SelectInput from "./SelectInput/SelectInput";
import DateInput from "./DateInput/DateInput";
import SwitchInput from "./SwitchInput/SwitchInput";
import PictureInputIndex from "./PictureInput/index";
import AutocompleteInputIndex from "./AutocompleteInput/index";
import CartInputIndex from "./CartInput";
import CustomInput from "./CustomInput/CustomInput";

function FormField({ field }: { field: formVanilla }) {

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
        return <AutocompleteInputIndex field={field} />
    }

    if (field.switch) {
        return <SwitchInput field={field} />
    }

    if (field.picture) {
        return <PictureInputIndex field={field} />
    }

    if (field.cart) {
        return <CartInputIndex field={field} />
    }

    if (field.custom) {
        return <CustomInput field={field} />
    }
    
    return <TextInput field={field} />
}

export default FormField;