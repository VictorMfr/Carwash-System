import { Tooltip } from "@mui/material";
import { ToolbarButton } from "@mui/x-data-grid";
import { DensityMedium } from "@mui/icons-material";

export default function Density() {
    return (
        <Tooltip title="Densidad">
            <ToolbarButton>
                <DensityMedium sx={{ fontSize: 20 }} />
            </ToolbarButton>
        </Tooltip>
    )
}