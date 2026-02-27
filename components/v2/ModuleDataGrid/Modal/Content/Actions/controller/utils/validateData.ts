import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";
import getValidationProcess from "./getValidationProcess";
import z from "zod";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";

export default function validateData(
    datagridCtx: ReturnType<typeof useModuleDataGridContext>,
    formData: Record<string, any>,
    formControls: vanillaFormStateControls
) {
    // Validar los datos del formulario
    const validation = getValidationProcess(datagridCtx);
    
    if (!validation) {
        console.log('No validation process');
        return z.any().safeParse(formData);
    };

    const validationResult = validation.safeParse(formData);

    if (!validationResult.success) {

        const formStateWithErrors = validationResult.error.issues.map(issue => ({
            field: issue.path[0] as string,
            value: formControls.formState.find(field => field.field === issue.path[0])?.value,
            error: issue.message
        }));

        formControls.setFormState(prev => {
            return prev.map(field => {
                const error = formStateWithErrors?.find(error => error.field === field.field);
                return {
                    ...field,
                    error: error?.error ?? field.error
                }
            });
        });

        const errorMessage = validationResult.error.issues.map(issue => issue.message).join(', ');

        throw new Error(errorMessage);
    }
}