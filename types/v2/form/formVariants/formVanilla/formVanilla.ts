import input from "@/types/v2/input/input";
import { GridProps } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";

export default interface formVanilla<T extends Record<string, unknown> = Record<string, unknown>> extends input {
    /**
	 * El id del campo, es obligatorio porque sirve ante 
     * un posible comportamiento de swap. Deberia ser siempre 
     * el mismo valor que el field.
	 */
    id: string;
    field: keyof T;
    headerName: string;
	size: number | GridProps['size'];
	TextFieldProps?: TextFieldProps;
    effects?: {
        disable?: boolean;
    }
}