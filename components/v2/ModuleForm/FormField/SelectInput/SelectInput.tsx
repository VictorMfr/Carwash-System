import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useGetFieldController from "../utils/useGetFieldController";

export default function SelectInput({ field }: { field: formVanilla }) {
    if (!field.select) return null;

    const controller = useGetFieldController(field);

    return (
        <FormControl fullWidth error={!!controller.state.error}>
            <InputLabel id={field.id} htmlFor={field.id}>{field.headerName}</InputLabel>
            <Select
                labelId={field.id}
                label={field.headerName}
                value={controller.state.value}
                onChange={controller.onChange}
                disabled={field.effects?.disable}
                {...controller.effects}
            >
                {field.select.options.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
            <FormHelperText error={!!controller.state.error}>{controller.state.error}</FormHelperText>
        </FormControl>
    )
}