import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { config } from "./config/config";

export const accountsDatagrid: datagrid = {
    url: '/api/finance/account/balance',
    columns,
    config,
}