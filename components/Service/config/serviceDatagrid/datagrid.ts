import datagrid from "@/types/v2/datagrid/datagrid";
import { actions } from "./actions/actions";
import { columns } from "./columns/columns";
import { config } from "./config/config";

export const serviceDatagrid: datagrid = {
    url: '/api/service',
    columns,
    actions,
    config,
}