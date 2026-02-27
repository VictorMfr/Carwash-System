import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";

export const clientDatagrid: datagrid = {
    url: '/api/service/client',
    columns,
    actions,
    config,
};
