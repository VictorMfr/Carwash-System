import { useModuleDataGridContext } from "../context";

export default function useModalController() {
    const datagridCtx = useModuleDataGridContext();
    
    const closeModalHandler = () => {
        datagridCtx.setModalState({ ...datagridCtx.modalState, open: false });
    }

    return {
        modalState: datagridCtx.modalState,
        modalConfig: datagridCtx.settings.config?.modal,
        closeModalHandler
    }
}