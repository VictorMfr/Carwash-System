import columns from "@/types/v2/datagrid/columns/columns";

export const model: columns = {
    id: 'model',
    field: 'model',
    headerName: 'Modelo',
    size: 12,
    flex: 1,
    autocomplete: {
        url: '/api/service/vehicle/model',
        searchField: 'name',
    }
};