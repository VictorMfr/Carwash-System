import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import { useModuleDataGridContext } from "../../../../context";
import getFormData from "@/components/v2/ModuleForm/utils/getFormData";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import validateData from "./utils/validateData";
import submitRequest from "./utils/submitRequest/submitRequest";
import { useState } from "react";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function useModalActionsController(formControls: vanillaFormStateControls) {

    const [submitLoading, setSubmitLoading] = useState(false);
    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();

    const isVanilla = Array.isArray(datagridCtx.settings.columns);

    const handleCancel = () => {
        datagridCtx.setModalState({ ...datagridCtx.modalState, open: false });
    }

    const handleSubmit = async () => {
        try {
            const formData = getFormData(formControls);
            validateData(datagridCtx, formData, formControls);

            setSubmitLoading(true);
            const response = await submitRequest(datagridCtx, formData);

            if (datagridCtx.modalState.type === 'add') {

                datagridCtx.setFetchData(prev => [...prev, response]);
                datagridCtx.setModalState({ ...datagridCtx.modalState, open: false });
                uiContext.setSnackbar({ open: true, message: 'Registro agregado correctamente', severity: 'success' });

            } else {
                const id = Array.isArray(datagridCtx.modalState.data)
                    ? datagridCtx.modalState.data.find((field: formStateField) => field.field === 'id')?.value
                    : undefined;
                datagridCtx.setFetchData(prev => prev.map(item => item.id === id ? response : item));
                uiContext.setSnackbar({ open: true, message: 'Registro actualizado correctamente', severity: 'success' });
                datagridCtx.setModalState({ ...datagridCtx.modalState, open: false, type: 'add', data: undefined });
            }
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setSubmitLoading(false);
        }
    }

    return {
        isVanilla,
        handleCancel,
        handleSubmit,
        submitLoading,
    }
}