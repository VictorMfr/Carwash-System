import { Tooltip } from "@mui/material";
import { ExportPrint } from "@mui/x-data-grid";
import { ToolbarButton } from "@mui/x-data-grid";
import { Print } from "@mui/icons-material";
import useExportController from "./controller";

export default function Export() {

    const controller = useExportController();


    return (
        <Tooltip title="Imprimir">
            <ExportPrint
                options={controller.exportPrintOptions}
                render={<ToolbarButton />}
            >
                <Print fontSize="small" />
            </ExportPrint>
        </Tooltip>
    )
}