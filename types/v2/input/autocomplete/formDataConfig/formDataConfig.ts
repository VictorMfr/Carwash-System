import form from "../../../form/form";
import { ZodSchema } from "zod";
import { DialogProps } from "@mui/material";

export default interface formDataConfig {
    createFillField?: string;
    validation?: ZodSchema<any>;
    columns: Omit<form, 'url'>;
    modalConfig?: Omit<DialogProps, 'open' | 'onClose'>;
}