import { Tooltip } from "@mui/material";
import { FilterPanelTrigger } from "@mui/x-data-grid";
import { ToolbarButton } from "@mui/x-data-grid";
import { FilterList } from "@mui/icons-material";

export default function Filter() {
    return (
        <Tooltip title="Filtrar">
            <FilterPanelTrigger render={<ToolbarButton />}>
                <FilterList fontSize="small" />
            </FilterPanelTrigger>
        </Tooltip>
    )
}