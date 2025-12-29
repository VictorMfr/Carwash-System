import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import form from "@/types/v2/form/form";
import getFormFields from "../../FormField/utils/getFormFields";
import getInitialStateValue from "../getInitialStateValue";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";


export default function getNewFormState(settings: form, prevFormState: formStateField[]): formStateField[] {
    // La idea es que cree un nuevo formState considerando los valores ya cargados en el prevFormState
    // Si los nuevos valores pertenecen a un campo de settings que no cambio, se debe mantener el valor en el prevFormState
    // Por el contrario, simplemente el valor debe ser uno inicial
    const newFormFields: formVanilla[] = getFormFields(settings);

    const newFormFieldsState: formStateField[] = newFormFields.map(field => ({
        field: field.field,
        // Si el campo existe en el prevFormState, se debe mantener el valor, de lo contrario se debe crear uno inicial
        value: prevFormState.find(state => state.field === field.field)?.value ?? getInitialStateValue(field),
        error: ''
    }));

    return newFormFieldsState;
}