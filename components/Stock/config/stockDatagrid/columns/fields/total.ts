import columns from "@/types/v2/datagrid/columns/columns";

export const total: columns = {
    id: 'total_quantity',
    field: 'total_quantity',
    headerName: 'Cantidad Total',
    size: 12,
    width: 140,
    createHidden: true,
    updateHidden: true,
    flex: 1,
    number: {}
};
