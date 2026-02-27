import type columns from "@/types/v2/datagrid/columns/columns";

export const account: columns = {
    id: 'account',
    field: 'account',
    headerName: 'Cuenta',
    size: 4,
    autocomplete: {
        url: '/api/finance/account',
        searchField: 'name',
        newItemLabel: 'Agregar cuenta',
    },
}