import columns from "@/types/v2/datagrid/columns/columns";

export const client: columns = {
    id: 'client',
    field: 'client',
    headerName: 'Cliente',
    size: 12,
    flex: 1,
    columnHidden: true,
    TextFieldProps: {
        sx: { display: 'none', position: 'absolute' },
    },
};
