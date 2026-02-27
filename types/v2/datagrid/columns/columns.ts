import { GridColDef } from "@mui/x-data-grid";
import formVanilla from "../../form/formVariants/formVanilla/formVanilla";
import form from "../../form/form";

type columns = GridColDef & Omit<formVanilla, 'field' | 'headerName'> & {
    createHidden?: boolean;
    updateHidden?: boolean;
    columnHidden?: boolean;
};

export type formColumns = form & { fields: columns[] }

export default columns;