import datagrid from "@/types/v2/datagrid/datagrid";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import { columns } from "./columns/columns";

export const StockDetailsDatagrid: datagrid = {
    url: '/api/stock/details',
    columns,
    actions,
    config,
};
