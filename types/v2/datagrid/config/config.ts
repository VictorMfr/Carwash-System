import operation from "./operation/operation";
import { DataGridProps } from "@mui/x-data-grid";
import { DialogProps } from "@mui/material";

export default interface config extends Partial<DataGridProps>{
    create?: operation;
    edit?: operation;
    delete?: Pick<operation, 'hiddenAction'>;
    modal: DialogProps;
};