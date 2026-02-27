import columns from "@/types/v2/datagrid/columns/columns";
import RecipeCartInput from "@/components/Service/components/RecipeCartInput/RecipeCartInput";
import { ButtonBase, Chip, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

const RecipeChip = (params: GridRenderCellParams) => {

    console.log(params.row.recipeName);

    return (
        <Tooltip title={params.row.recipeName.products.map((p: any) => p.name).join(', ')}>
            <Chip label={params.row.recipeName.name} />
        </Tooltip>
    )
}

export const recipe: columns = {
    id: 'recipeName',
    field: 'recipeName',
    headerName: 'Receta',
    size: 12,
    flex: 1,
    custom: RecipeCartInput,
    renderCell: RecipeChip
};




