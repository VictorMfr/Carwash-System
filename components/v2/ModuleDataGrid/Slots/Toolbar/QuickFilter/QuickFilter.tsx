import { Tooltip } from "@mui/material";
import QuickFilterSearch from "@/components/v2/ModuleDataGrid/Slots/Toolbar/QuickFilter/Search/Search";

export default function QuickFilter() {
    return (
        <Tooltip title="Quick Filter">
            <QuickFilterSearch />
        </Tooltip>
    )
}