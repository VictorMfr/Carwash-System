import datagrid from "@/types/v2/datagrid/datagrid";
import { Inventory } from "@mui/icons-material";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";

export const StockDatagrid: datagrid = {
    icon: Inventory,
    url: '/api/stock',
    title: 'Inventario',
    description: 'Aquí puedes ver el inventario de tus productos.',
    columns,
    actions,
    config,
}
