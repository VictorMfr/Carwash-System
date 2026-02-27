import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

export const VehicleModelDatagrid: datagrid = {
    url: '/api/service/vehicle/model',
    columns,
    actions,
    config,
}
