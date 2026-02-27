import type columns from "@/types/v2/datagrid/columns/columns";

export const method: columns = {
    id: 'method',
    field: 'method',
    headerName: 'Método',
    size: 4,
    autocomplete: {
        url: '/api/finance/method',
        searchField: 'name',
        newItemLabel: 'Agregar método',
    },
}