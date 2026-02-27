import { Tooltip, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import useDeleteActionController from "./controller";

export default function DeleteAction({ itemId }: { itemId: string }) {

    const controller = useDeleteActionController(itemId);

    return (
        <Tooltip title="Eliminar">
            <IconButton onClick={controller.deleteItemHandler}>
                <Delete />
            </IconButton>
        </Tooltip>
    );
}