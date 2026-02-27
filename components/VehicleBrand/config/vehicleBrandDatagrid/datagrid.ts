import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const VehicleBrandDatagrid: datagrid = {
    url: '/api/service/vehicle/brand',
    columns,
    actions,
    config,
}
