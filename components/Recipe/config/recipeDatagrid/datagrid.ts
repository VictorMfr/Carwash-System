import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export const RecipeDatagrid: datagrid = {
    url: '/api/service/recipe',
    columns,
    actions,
    config,
}
