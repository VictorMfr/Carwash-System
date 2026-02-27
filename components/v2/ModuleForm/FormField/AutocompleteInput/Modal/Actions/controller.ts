import { useState } from "react";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { useAutocompleteInputContext } from "../../context";
import getPayload from "@/components/v2/ModuleForm/utils/getPayload";
import type { contentType } from "@/components/v2/ModuleForm/utils/getPayload";

export default function useModalActionsController(
    controls: vanillaFormStateControls | stepperFormStateControls,
) {

    const autocompleteCtx = useAutocompleteInputContext();

    const uiContext = useUIDisplayControls();
    const [submitLoading, setSubmitLoading] = useState(false);


    const handleSubmit = async () => {

        if (!autocompleteCtx.field.autocomplete) throw new Error('field.autocomplete is required');
        if (!autocompleteCtx.field.autocomplete.url) throw new Error('field.autocomplete.url is required');

        const validation = autocompleteCtx.field.autocomplete?.formData?.validation;

        const data = getPayload(controls.formState, autocompleteCtx.field.autocomplete?.formData?.columns.contentType as contentType);


        if (validation) {
            const result = validation.safeParse(data);

            if (!result.success) {

                return controls.setFormState(prev => prev.map(field => ({
                    ...field,
                    error: result.error.issues.find(issue => issue.path[0] === field.field)?.message ?? ''
                })));
            }
        }

        try {
            setSubmitLoading(true);
            const response = await api.post(
                autocompleteCtx.field.autocomplete?.url,
                data, {
                headers: {
                    'Content-Type': autocompleteCtx.field.autocomplete?.formData?.columns.contentType as contentType,
                }
            });

            uiContext.setSnackbar({
                open: true,
                message: 'Agregado correctamente',
                severity: 'success'
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

            controls.setFormState(prev => prev.map(formField => ({
                ...formField,
                value: '',
                error: ''
            })));

            autocompleteCtx.setModal({ open: false });
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setSubmitLoading(false);
        }
    }

    return {
        handleSubmit,
        submitLoading,
    }
}