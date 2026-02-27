import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import BuildIcon from '@mui/icons-material/Build';

export const BrandDatagrid: datagrid = {
    icon: BuildIcon,
    url: '/api/stock/brand',
    title: 'Marcas',
    description: 'Aquí puedes ver y gestionar las marcas de tus productos.',
    columns,
    actions,
    config,
}
