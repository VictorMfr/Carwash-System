import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { handleApiError } from "@/lib/error";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import getFormData from "@/components/v2/ModuleForm/utils/getFormData";
import { Dispatch, SetStateAction } from "react";

export default function confirmCreationHandler(
    field: formVanilla,
    uiContext: ReturnType<typeof useUIDisplayControls>, 
    controls: vanillaFormStateControls,
    newValue: string,
    setData: Dispatch<SetStateAction<any[]>>

) {
    uiContext.setAlert({
        open: true,
        title: 'Agregar marca',
        message: '¿Estás seguro de querer agregar esta marca?',
        severity: 'warning',
        actions: [
            { label: 'Cancelar', onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) },
            { label: 'Agregar', onClick: async () => {
                try {

                    uiContext.setLoading(true);

                    

                    if (!field.autocomplete) throw new Error('field.autocomplete is required');
                    if (!field.autocomplete.url) throw new Error('field.autocomplete.url is required');

                    const payload = {
                        [field.autocomplete.searchField]: newValue
                    }

                    console.log(payload);

                    const response = await api.post(field.autocomplete.url, payload);
                    setData(prev => [...prev, response.data]);


                    uiContext.setSnackbar({
                        open: true,
                        message: field.autocomplete.confirm?.successMessage ?? 'Agregado correctamente',
                        severity: 'success'
                    });

                    // Asignar el valor del campo de creación del autocomplete
                    controls.setFormState(prev => {
                        return prev.map(i => {
                            return i.field === field.field ? { ...i, value: response.data } : i;
                        });
                    });

                    uiContext.setAlert(prev => ({ ...prev, open: false }));

                } catch (error) {
                    handleApiError(error, uiContext);
                } finally {
                    uiContext.setLoading(false);
                }
            }},
        ]
    });
}