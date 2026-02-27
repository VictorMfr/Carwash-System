import datagrid from "@/types/v2/datagrid/datagrid";
import { Inventory } from "@mui/icons-material";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";

export const StockDatagrid: datagrid = {
    url: '/api/stock',
    columns,
    actions,
    config,
}
