import { GridRenderCellParams } from "@mui/x-data-grid";
import { useModuleDataGridContext } from "../../../context";
import getFormStateFromPayload from "@/components/v2/ModuleForm/utils/getFormState/getFormStateFromPayload";

export default function useUpdateActionController(params: GridRenderCellParams) {
    const { settings, setModalState } = useModuleDataGridContext();

    const editable = settings.config?.edit;
    if (editable && editable.hiddenAction) return { editable: false, handleUpdate: () => {} }

    const formState = getFormStateFromPayload(params.row);

    return {
        handleUpdate: () => {
            setModalState({ open: true, type: 'edit', data: formState });
        },
        editable
    }
}