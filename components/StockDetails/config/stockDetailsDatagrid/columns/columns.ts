import { stepperColumns } from "@/types/v2/datagrid/datagrid";
import { steps } from "./steps/steps";

export const columns: stepperColumns = {
    title: 'Detalles del stock',
    orientation: 'horizontal',
    steps,
}