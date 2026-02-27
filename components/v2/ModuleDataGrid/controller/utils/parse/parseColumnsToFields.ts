import columns from "@/types/v2/datagrid/columns/columns";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";

export default function parseColumnsToFields(columns: columns[]): formVanilla[] | formStepper {
    return columns as formVanilla[] | formStepper;
}