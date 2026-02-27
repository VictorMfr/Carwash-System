import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import EngineeringIcon from '@mui/icons-material/Engineering';

export const OperatorDatagrid: datagrid = {
    icon: EngineeringIcon,
    url: '/api/service/operator',
    title: 'Operadores',
    description: 'Aquí puedes ver y gestionar los operadores.',
    columns,
    actions,
    config,
}
