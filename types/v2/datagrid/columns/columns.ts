import { GridColDef } from "@mui/x-data-grid";
import formVanilla from "../../form/formVariants/formVanilla/formVanilla";

type columns = GridColDef & Omit<formVanilla, 'field' | 'headerName'> & {
    createHidden?: boolean;
    updateHidden?: boolean;
    columnHidden?: boolean;
};

export default columns;