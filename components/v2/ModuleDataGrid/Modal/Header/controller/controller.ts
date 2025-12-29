import { useModuleDataGridContext } from "../../../context";
import getTitle from "./utils/getTitle";
import getDescription from "./utils/getDescription";

export default function useModalHeaderController() {

    const datagridCtx = useModuleDataGridContext();

    const title = getTitle(datagridCtx.modalState.type, datagridCtx.settings);
    const description = getDescription(datagridCtx.modalState.type, datagridCtx.settings);
    
    return {
        title,
        description,
    }
}