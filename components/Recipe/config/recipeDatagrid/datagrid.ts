import datagrid from "@/types/v2/datagrid/datagrid";
import { columns } from "./columns/columns";
import { actions } from "./actions/actions";
import { config } from "./config/config";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export const RecipeDatagrid: datagrid = {
    icon: RestaurantMenuIcon,
    url: '/api/service/recipe',
    title: 'Recetas',
    description: 'Aquí puedes ver y gestionar las recetas.',
    columns,
    actions,
    config,
}
