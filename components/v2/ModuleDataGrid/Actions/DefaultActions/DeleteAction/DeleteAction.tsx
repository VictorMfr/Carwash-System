import { IconButton, Tooltip } from "@mui/material";
import useDeleteActionController from "./controller";
import { Delete } from "@mui/icons-material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function DeleteAction({ params }: { params: GridRenderCellParams }) {
    
    const controller = useDeleteActionController(params);

    if (!controller.deletable) return null;

    return (
        <Tooltip title={"Borrar"}>
            <IconButton onClick={controller.handleDelete}>
                <Delete />
            </IconButton>
        </Tooltip>
    )
}