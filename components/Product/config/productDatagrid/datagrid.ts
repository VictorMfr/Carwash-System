import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import Inventory2Icon from '@mui/icons-material/Inventory2';

export const ProductDatagrid: datagrid = {
    icon: Inventory2Icon,
    url: '/api/stock/product',
    title: 'Productos',
    description: 'Productos del sistema',
    columns,
    actions,
    config,
}
