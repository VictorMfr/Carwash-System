import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import BuildIcon from '@mui/icons-material/Build';

export const BrandDatagrid: datagrid = {
    url: '/api/stock/brand',
    columns,
    actions,
    config,
}
