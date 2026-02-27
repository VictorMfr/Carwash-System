import columns from "@/types/v2/datagrid/columns/columns";

export const brand: columns = {
    id: 'brand',
    field: 'brand',
    headerName: 'Marca',
    size: 12,
    flex: 1,
    autocomplete: {
        url: '/api/service/vehicle/brand',
        searchField: 'name',
    }
}