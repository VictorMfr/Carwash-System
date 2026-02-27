import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function getRowsToDelete(
    rowsSelected: GridRowSelectionModel,
    fetchData: any[]
): number[] {
    // Si es exclude, devolver todos los rows a excepción de los deseleccionados
    if (rowsSelected.type === 'exclude') {
        return fetchData.filter((row: any) => !rowsSelected.ids.has(row.id)).map((row: any) => row.id);
    }

    return fetchData.filter((row: any) => rowsSelected.ids.has(row.id)).map((row: any) => row.id);
}