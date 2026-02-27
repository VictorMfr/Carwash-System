import type actions from "@/types/v2/datagrid/actions/actions";
import { Info } from "@mui/icons-material";
import { GridRenderCellParams } from "@mui/x-data-grid";


export const actions: actions = {
    config: {
        field: 'actions',
        headerName: 'Acciones',
        width: 150,
    },
    options: [
        {
            name: 'Ver detalles',
            description: 'Ver detalles',
            icon: Info,
            render: (params: GridRenderCellParams) => {
                return `/dashboard/stock/${params.row.id}`
            },
        }
    ],
};
