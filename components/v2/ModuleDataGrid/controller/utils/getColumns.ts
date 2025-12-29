import { GridColDef } from "@mui/x-data-grid";
import datagrid from "@/types/v2/datagrid/datagrid";
import columns from "@/types/v2/datagrid/columns/columns";

// Obten las columnas segun el tipo de columns que se le pase
export default function getColumns(columns: datagrid['columns']): columns[] {
    // Si columns es un array, significa que es un formVanilla
    if (Array.isArray(columns)) {
        return columns;
    }

    // Si columns es un formStepper, significa que es un formStepper
    return columns.steps.flatMap((step) => step.fields) as columns[];
}