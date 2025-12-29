import { Tooltip } from "@mui/material";
import { ExportCsv } from "@mui/x-data-grid";
import { ToolbarButton } from "@mui/x-data-grid";
import { FileDownload } from "@mui/icons-material";
import useDownloadController from "./controller";

export default function Download() {

    const controller = useDownloadController();

    return (
        <Tooltip title="Descargar como CSV">
            <ExportCsv
                options={controller.downloadOptions}
                render={<ToolbarButton />}
            >
                <FileDownload fontSize="small" />
            </ExportCsv>
        </Tooltip>
    )
}