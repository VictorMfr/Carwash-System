import { Toolbar as MuiToolbar } from "@mui/x-data-grid";
import QuickFilter from "./QuickFilter/QuickFilter";
import Filter from "./Filter/Filter";
import Export from "./Export/Export";
import Download from "./Download/Download";
import Create from "./Create/Create";
import BulkDelete from "./BulkDelete/BulkDelete";
import useToolbarController from "./controller";

export default function Toolbar() {

    const controller = useToolbarController();

    return (
        <MuiToolbar>
            {controller.isQuickFilterEnabled && <QuickFilter/>}
            {controller.isFilterEnabled && <Filter/>}
            {controller.isExportEnabled && <Export/>}
            {controller.isDownloadEnabled && <Download/>}
            {controller.isCreateEnabled && <Create/>}
            {controller.isBulkDeleteEnabled && <BulkDelete/>}
        </MuiToolbar>
    );
}