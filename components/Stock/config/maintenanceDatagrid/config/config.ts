import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: false,
    spacing: 2,
    rowHeight: 100,
    toolbar: {
        show: ['quickFilter'],
    },
};
