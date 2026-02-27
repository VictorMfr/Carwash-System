import useGetFormStateControls from "@/components/v2/ModuleForm/utils/useGetFormStateControls";
import { useModuleDataGridContext } from "../../../context";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";
import form from "@/types/v2/form/form";
import formConfig from "@/types/v2/form/formConfig/formConfig";
import contentType from "@/types/v2/form/contentType/contentType";
import config from "@/types/v2/datagrid/config/config";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import getFilteredColumns from "./utils/getFilteredColumns";
import columns from "@/types/v2/datagrid/columns/columns";
import getFormData from "@/components/v2/ModuleForm/utils/getFormData";
import submitRequest from "../Actions/controller/utils/submitRequest/submitRequest";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useModalContentController() {

    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();

    const handleCancel = () => {
        datagridCtx.setModalState({ ...datagridCtx.modalState, open: false });
    }

    const handleSubmit = async (formState: formStateField[]) => {
        try {
            const formData = getFormData(formState);
            console.log('formData', formData);
            const response = await submitRequest(datagridCtx, formData);
            if (datagridCtx.modalState.type === 'add') {
                datagridCtx.setFetchData(prev => [...prev, response]);
                datagridCtx.setModalState({ ...datagridCtx.modalState, open: false });
                uiContext.setSnackbar({ open: true, message: 'Registro agregado correctamente', severity: 'success' });
            } else {
                datagridCtx.setFetchData(prev => prev.map(item => item.id === response.id ? response : item));
                datagridCtx.setModalState({ ...datagridCtx.modalState, open: false, type: 'add', data: undefined });
                uiContext.setSnackbar({ open: true, message: 'Registro actualizado correctamente', severity: 'success' });
            }
        } catch (error) {
            handleApiError(error, uiContext);
        }
    }
    
    const initialState = Array.isArray(datagridCtx.modalState.data)
        ? datagridCtx.modalState.data as formStateField[]
        : undefined;

    const controls = useGetFormStateControls(
        datagridCtx.settings.columns as formVanilla[] | formStepper,
        {
            onSubmit: handleSubmit,
            onCancel: handleCancel,
        },
        initialState
    );

    const { 
        checkboxSelection,
        rowSelection,
        disableRowSelectionOnClick,
        rowHeight,
        ...rest
    } = datagridCtx.settings.config as config;

    const mode = datagridCtx.modalState.type === 'add' ? 'add' : 'edit';
    const filteredColumns = getFilteredColumns(datagridCtx.settings.columns as columns[], mode);

        
    const config = rest as formConfig;

    const settings: form = {
        config,
        contentType: datagridCtx.settings.config?.create?.contentType as contentType,
        fields: filteredColumns as formVanilla[] | formStepper,
    }

    return {
        controls,
        settings,
    }
}