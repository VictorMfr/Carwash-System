import columns from "@/types/v2/datagrid/columns/columns";

export const method: columns = {
    id: 'method',
    field: 'method',
    headerName: 'Método de pago',
    size: 6,
    flex: 1,
    autocomplete: {
        url: '/api/finance/method',
        searchField: 'name',
        newItemLabel: 'Agregar método',
    },
}