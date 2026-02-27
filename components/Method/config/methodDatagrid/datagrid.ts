import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import PaymentIcon from '@mui/icons-material/Payment';

export const MethodDatagrid: datagrid = {
    icon: PaymentIcon,
    url: '/api/finance/method',
    title: 'Métodos',
    description: 'Aquí puedes ver y gestionar los métodos de pago.',
    columns,
    actions,
    config,
}
