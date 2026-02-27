import { DialogProps } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ComponentType } from "react";

export default interface actions {
    config: GridColDef;
    options: {
        name: string;
        description: string;
        icon: ComponentType;
        render: ComponentType<{ handleClose: () => void, params: GridRenderCellParams }> | ((params: GridRenderCellParams) => string);
        modalConfig?: Omit<DialogProps, 'open' | 'onClose'>;
    }[];
}