import { useModuleFormContext } from "../context";
import getFormType from "./utils/getFormType";

export default function useModuleFormController() {
    const { settings } = useModuleFormContext();

    const formType = getFormType(settings);
    
    return {
        settings,
        formType,
    }
}