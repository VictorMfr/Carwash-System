import datagrid from "@/types/v2/datagrid/datagrid";
import { config } from "./config/config";
import { actions } from "./actions/actions";
import { columns } from "./columns/columns";

export const usersDatagrid: datagrid = {
    url: '/api/user',
    columns,
    actions,
    config
}