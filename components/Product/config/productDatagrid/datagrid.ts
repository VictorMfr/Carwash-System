import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import Inventory2Icon from '@mui/icons-material/Inventory2';

export const ProductDatagrid: datagrid = {
    url: '/api/stock/product',
    columns,
    actions,
    config,
}
