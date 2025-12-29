import { GridRenderCellParams } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { ComponentType } from "react";

export default interface actions {
    config: GridColDef;
    options: {
        name: string;
        icon: ComponentType<{ params: GridRenderCellParams } | any>;
        dispatch?: ComponentType<{
            setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void,
            actionModal: { open: boolean, action: any, data: any }
        }>;
        dispatchMode?: 'modal' | 'link';
        onClick?: (args: Record<string, any>) => void;
    }[];
}