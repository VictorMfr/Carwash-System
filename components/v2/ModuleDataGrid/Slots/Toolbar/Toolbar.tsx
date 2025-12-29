import { Toolbar as MuiToolbar } from "@mui/x-data-grid";
import QuickFilter from "./QuickFilter/QuickFilter";
import Filter from "./Filter/Filter";
import Export from "./Export/Export";
import Download from "./Download/Download";
import Density from "./Density/Density";
import Create from "./Create/Create";
import ColumnFilter from "./ColumnFilter/ColumnFilter";
import BulkDelete from "./BulkDelete/BulkDelete";

export default function Toolbar() {
    return (
        <MuiToolbar>
            <QuickFilter/>
            <Filter/>
            <Export/>
            <Download/>
            <Density/>
            <Create/>
            <ColumnFilter/>
            <BulkDelete/>
        </MuiToolbar>
    );
}