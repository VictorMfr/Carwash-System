import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import form from "@/types/v2/form/form";
import useGetFormStateControls from "@/components/v2/ModuleForm/utils/useGetFormStateControls";
import { useEffect } from "react";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import getFormData from "@/components/v2/ModuleForm/utils/getFormData";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { useAutocompleteInputContext } from "../context";


export default function useAutocompleteInputModalController() {
    const autocompleteCtx = useAutocompleteInputContext();

    if (!autocompleteCtx.field.autocomplete) return null;
    if (!autocompleteCtx.field.autocomplete.formData) return null;

    const uiContext = useUIDisplayControls();
    const controls = useGetFormStateControls(autocompleteCtx.field.autocomplete.formData.columns.fields);

    const settings: form = {
        config: autocompleteCtx.field.autocomplete.formData.columns.config,
        contentType: autocompleteCtx.field.autocomplete.formData.columns.contentType,
        fields: autocompleteCtx.field.autocomplete.formData.columns.fields,
    };

    const isStepper = Array.isArray(autocompleteCtx.field.autocomplete.formData.columns.fields);


    const handleCancel = () => {
        autocompleteCtx.setModal({ open: false });
    }

    const handleStepperSubmit = async (formState: formStateField[]) => {
        if (!autocompleteCtx.field.autocomplete) throw new Error('field.autocomplete is required');
        if (!autocompleteCtx.field.autocomplete.url) throw new Error('field.autocomplete.url is required');

        try {
            const data = getFormData(formState);
            const response = await api.post(autocompleteCtx.field.autocomplete.url, data);

            uiContext.setSnackbar({
                open: true,
                message: 'Agregado correctamente',
                severity: 'success',
            });

            const createdItem = response.data;
            const searchField = autocompleteCtx.field.autocomplete.searchField ?? 'name';

            autocompleteCtx.setData(prev => {
                const next = Array.isArray(prev) ? prev : [];
                const hasId = createdItem?.id !== undefined;
                const exists = next.some((option: any) => (
                    (hasId && option?.id === createdItem?.id) ||
                    option?.[searchField] === createdItem?.[searchField]
                ));
                return exists ? next : [...next, createdItem];
            });

            autocompleteCtx.changeHandler(null, createdItem);

            const stepperControls = controls as stepperFormStateControls;
            stepperControls.setFormState(prev => prev.map(formField => ({
                ...formField,
                value: '',
                error: ''
            })));
            stepperControls.stepper.setActiveStep(0);

            autocompleteCtx.setModal({ open: false });
        } catch (error) {
            handleApiError(error, uiContext);
        }
    };

    if (!isStepper) {
        const stepperControls = controls as stepperFormStateControls;
        stepperControls.stepper.onSubmit = handleStepperSubmit;
        stepperControls.stepper.onCancel = handleCancel;
    }

    useEffect(() => {
        if (autocompleteCtx.modal.open && autocompleteCtx.field.autocomplete?.formData?.createFillField) {
            controls.setFormState(prev => prev.map(i => i.field === autocompleteCtx.field.autocomplete?.formData?.createFillField ? { ...i, value: autocompleteCtx.modal.inputValue } : i));
        }
    }, [autocompleteCtx.modal.open]);

    

    return {
        ...autocompleteCtx,
        isStepper,
        settings,
        controls,
        handleCancel,
    }
}