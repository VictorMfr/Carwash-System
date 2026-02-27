import { Tooltip } from "@mui/material";
import { ToolbarButton } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import useCreateController from "./controller";

export default function Create() {

    const controller = useCreateController();
    
    return (
        <Tooltip title="Agregar">
            <ToolbarButton onClick={controller.openModalHandler}>
                <Add fontSize="small" />
            </ToolbarButton>
        </Tooltip>
    )
}