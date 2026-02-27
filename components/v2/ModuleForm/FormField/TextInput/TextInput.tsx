import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import TextField from "@mui/material/TextField";
import useGetFieldController from "../utils/useGetFieldController";

export default function TextInput({ field }: { field: formVanilla }) {

    const controller = useGetFieldController(field);

    return (
        <TextField
            value={controller.state.value}
            onChange={controller.onChange}
            label={field.headerName}
            fullWidth
            {...field.TextFieldProps}
            {...controller.effects}
            helperText={controller.state.error}
            error={!!controller.state.error}
        />
    );
}