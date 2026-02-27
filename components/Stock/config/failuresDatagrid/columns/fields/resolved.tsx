import columns from "@/types/v2/datagrid/columns/columns";
import { Chip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const resolved: columns = {
    id: 'resolved',
    field: 'resolved',
    headerName: 'Resuelta',
    size: 12,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
        <Chip
            label={params.value ? 'SI' : 'NO'}
            color={params.value ? 'success' : 'error'}
            size="small"
        />
    ),
    switch: {},
};
