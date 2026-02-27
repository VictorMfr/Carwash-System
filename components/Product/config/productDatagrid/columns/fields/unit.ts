import columns from "@/types/v2/datagrid/columns/columns";

export const unit: columns = {
    id: 'unit',
    field: 'unit',
    headerName: 'Unidad',
    size: 12,
    flex: 1,
    select: {
        label: 'Unidad',
        options: ['kg', 'gr', 'lt', 'ml', 'u', 'pcs', 'mtr'],
    },
};
