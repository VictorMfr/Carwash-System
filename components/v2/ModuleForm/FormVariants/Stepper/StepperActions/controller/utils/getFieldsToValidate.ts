import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";

/**
 * Esta funcion se encarga de obtener los campos a validar dentro de un stepper.
 * Cada step tiene un mecanismo distinto de validacion y depende de lo que le haya
 * pasado en la propiedad validation del step.
 * 
 * Esta funcion ademas centra su atencion en los efectos secundarios que se generan
 * por los cambios de los switches y su effecto swap (que cuando los switches se activan,
 * se intercambia el campo objetivo de acuerdo a las reglas de swap).
 */
export default function getFieldsToValidate(
    step: stepperStep,
    formState: formStateField[]
) {
    // 1. Obtener los campos del step
    const fields = step.fields ?? [];

    // 2. Obtener los mismos campos pero dentro del formState
    const fieldsInFormState = formState.filter(field => fields.some(f => f.field === field.field));

    // 3. Tomar cada uno de los campos que son switches
    const switches = fields.filter(field => field.switch);

    // 4. Para cada switch, verificar si es true
    switches.forEach(sf => {
        // 5. Buscar el campo en el formState
        const switchState = formState.find(field => field.field === sf.field);

        // 6. Si es true, verificar si tiene swapIds
        if (switchState && switchState.value) {
            // 7. Si tiene swapIds, agregar los campos de los swapIds a los campos a validar
            if (sf.switch?.swapIds) {
                const swapFields = sf.switch.swapIds.map(swapId => swapId.value.field);
                const fieldsToAdd = formState.filter(field => swapFields.includes(field.field));

                // 8. Agregar los campos de los swapIds a los campos a validar
                fieldsInFormState.push(...fieldsToAdd);
            }
        }
    });

    // 9. Evitar duplicados por field
    const uniqueByField = new Map(fieldsInFormState.map(field => [field.field, field]));
    return Array.from(uniqueByField.values());
}