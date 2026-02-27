import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const AccountDatagrid: datagrid = {
    icon: AccountBalanceIcon,
    url: '/api/finance/account',
    title: 'Cuentas',
    description: 'Aquí puedes ver y gestionar las cuentas.',
    columns,
    actions,
    config,
}
