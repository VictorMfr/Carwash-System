import { ToolbarItem } from "@/types/datagrid/datagrid";
import { ComponentType } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default interface toolbar {
    data?: {
        name: string;
        icon: ComponentType<{ params: GridRenderCellParams } | any>;
        dispatch?: ComponentType<{
            setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void,
            actionModal: { open: boolean, action: any, data: any }
        }>;
        dispatchMode?: 'modal' | 'link';
        onClick?: (args: Record<string, any>) => void;
    }[];
    show?: ToolbarItem[];
}