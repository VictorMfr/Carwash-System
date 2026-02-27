import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import EngineeringIcon from '@mui/icons-material/Engineering';

export const OperatorDatagrid: datagrid = {
    url: '/api/service/operator',
    columns,
    actions,
    config,
}
