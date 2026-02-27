import columns from "@/types/v2/datagrid/columns/columns";

export const isTool: columns = {
    id: 'isTool',
    field: 'isTool',
    headerName: 'Es herramienta',
    size: 12,
    columnHidden: true,
    switch: {
        disableIds: [
            { id: 'unit', value: 'u' },
        ],
    },
};
