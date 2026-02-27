import columns from "@/types/v2/datagrid/columns/columns";

/**
 * Filtra las columnas eliminando aquellas que tienen la propiedad columnHidden en true.
 * 
 * @param columns - Array de columnas a filtrar.
 * @returns Un nuevo array únicamente con las columnas visibles (sin columnHidden).
 */
export default function filterColumns(columns: columns[]) {
    return columns.filter((column) => !column.columnHidden);
}