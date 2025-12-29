import actions from "@/types/v2/datagrid/actions/actions";
import { IconButton, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function ActionItem({ action, params }: { action: actions['options'][number], params: GridRenderCellParams }) {
    return (
        <Tooltip title={action.name}>
            <IconButton onClick={action.onClick}>
                <action.icon />
            </IconButton>
        </Tooltip>
    )
}