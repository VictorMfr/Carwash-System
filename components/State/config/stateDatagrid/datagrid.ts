import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import BuildIcon from '@mui/icons-material/Build';

export const StateDatagrid: datagrid = {
    icon: BuildIcon,
    url: '/api/stock/state',
    title: 'Estados',
    description: 'Aquí puedes ver y gestionar los estados de tus productos.',
    columns,
    actions,
    config,
}
