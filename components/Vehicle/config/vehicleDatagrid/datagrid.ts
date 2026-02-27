import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

export const VehicleDatagrid: datagrid = {
    icon: DirectionsCarFilledIcon,
    url: '/api/service/vehicle',
    title: 'Vehículos',
    description: 'Aquí puedes ver y gestionar los vehículos.',
    columns,
    actions,
    config,
}
