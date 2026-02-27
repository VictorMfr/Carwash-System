import { GridColDef } from "@mui/x-data-grid";
import datagrid from "@/types/v2/datagrid/datagrid";
import columns from "@/types/v2/datagrid/columns/columns";

/**
 * Obtiene las columnas de la grilla en función del tipo de dato que recibe.
 * Si recibe un array (columns[]), lo retorna tal cual.
 * Si recibe un objeto stepper (stepperColumns), toma todos los campos de todos los pasos y los convierte en un solo array.
 *
 * @param columns - Columnas de la grilla, puede ser un array de columnas simple o un objeto con pasos (stepper).
 * @returns Un array de columnas de la grilla.
 * 
 * Ejemplo de uso:
 * 
 * @example
 * // Usando columns como array simple
 * const simpleColumns = [
 *   { field: 'id', headerName: 'ID', width: 70 },
 *   { field: 'name', headerName: 'Nombre', width: 130 }
 * ];
 * getColumns(simpleColumns); // retorna simpleColumns
 * 
 * // Usando columns como objeto stepper con pasos
 * const stepperColumns = {
 *   steps: [
 *     { fields: [{ field: 'id', headerName: 'ID', width: 70 }] },
 *     { fields: [{ field: 'email', headerName: 'Email', width: 130 }] }
 *   ]
 * };
 * getColumns(stepperColumns); // retorna [{ field: 'id', headerName: 'ID', width: 70 }, { field: 'email', headerName: 'Email', width: 130 }]
 */
export default function getColumns(columns: datagrid['columns']): columns[] {
    // Si columns es un array, significa que es un formVanilla enriquecido (columns[])
    if (Array.isArray(columns)) {
        return columns;
    }

    // Si columns es un formStepper, significa que es un formStepper (stepperColumns)
    return columns.steps.flatMap((step) => step.fields) as columns[];
}