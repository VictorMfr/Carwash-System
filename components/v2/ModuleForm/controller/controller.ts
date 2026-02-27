import { useModuleFormContext } from "../context";
import getFormType from "./utils/getFormType";

export default function useModuleFormController() {
    const { settings, controls } = useModuleFormContext();

    const formType = getFormType(settings);

    console.log(controls.formState)
    
    return {
        settings,
        formType,
    }
}