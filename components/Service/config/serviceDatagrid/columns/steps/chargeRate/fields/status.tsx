import columns from "@/types/v2/datagrid/columns/columns";
import { Chip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const status: columns = {
    id: 'status',
    field: 'status',
    headerName: 'Estado',
    size: 12,
    flex: 1,
    createHidden: true,
    updateHidden: true,
    renderCell: (params: GridRenderCellParams) => (
        <Chip
            label={params.value}
            color={params.value === 'Pendiente' ? 'warning' : 'success'}
        />
    ),
};
