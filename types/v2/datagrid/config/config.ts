import operation from "./operation/operation";
import { DataGridProps } from "@mui/x-data-grid";
import { GridBaseProps } from "@mui/material";
import { DialogProps } from "@mui/material";
import { ToolbarItem } from "@/types/datagrid/datagrid";
import toolbar from "./toolbar/toolbar";

export default interface config extends Partial<DataGridProps>, Partial<Omit<GridBaseProps, 'columns'>> {
    create?: operation;
    edit?: operation;
    delete?: Pick<operation, 'hiddenAction'>;
    modal?: Omit<DialogProps, 'open' | 'onClose'>;
    append?: Record<string, any>;
    toolbar?: toolbar;
};