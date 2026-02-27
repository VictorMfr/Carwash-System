import { useModuleDataGridContext } from "../../../context";

    export default function useCreateController() {

    const datagridCtx = useModuleDataGridContext();

    const openModalHandler = () => {
        datagridCtx.setModalState({ 
            data: undefined,
            open: true, 
            type: 'add' 
        });
    }

    return {
        openModalHandler
    }
}