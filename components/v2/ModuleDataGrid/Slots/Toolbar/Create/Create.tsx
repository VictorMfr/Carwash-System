import { Tooltip } from "@mui/material";
import { ToolbarButton } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";

export default function Create() {

    
    return (
        <Tooltip title="Agregar">
            <ToolbarButton onClick={() => {}}>
                <Add fontSize="small" />
            </ToolbarButton>
        </Tooltip>
    )
}