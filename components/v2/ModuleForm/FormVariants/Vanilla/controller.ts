import { useModuleFormContext } from "../../context";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function useVanillaController() {
    const { settings } = useModuleFormContext();

    return {
        gridConfig: settings.config,
        fields: settings.fields as formVanilla[],
    }
}