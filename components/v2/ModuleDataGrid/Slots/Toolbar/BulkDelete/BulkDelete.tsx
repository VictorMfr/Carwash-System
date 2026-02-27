import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ToolbarButton } from "@mui/x-data-grid";
import useBulkDeleteController from "./controller/controller";

export default function BulkDelete() {

    const controller = useBulkDeleteController();

    return (
        <Tooltip title="Eliminar seleccionados">
            <ToolbarButton
                disabled={!controller.isBulkDeleteEnabled}
                onClick={controller.handleBulkDelete}
            >
                <Delete fontSize="small" />
            </ToolbarButton>
        </Tooltip>
    )
}