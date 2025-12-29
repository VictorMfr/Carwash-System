import form from "@/types/v2/form/form";

export default function getFormType(settings: form): 'vanilla' | 'stepper' {
    // Si fields es un array, significa que es un formVanilla
    if (Array.isArray(settings.fields)) {
        return 'vanilla';
    }

    // Si fields es un objeto, significa que es un formStepper
    return 'stepper';
}