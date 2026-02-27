import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import PaymentIcon from '@mui/icons-material/Payment';

export const MethodDatagrid: datagrid = {
    url: '/api/finance/method',
    columns,
    actions,
    config,
}
