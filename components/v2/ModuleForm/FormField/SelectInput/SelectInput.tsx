import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useGetFieldController from "../utils/useGetFieldController";

export default function SelectInput({ field }: { field: formVanilla }) {
    if (!field.select) return null;

    const controller = useGetFieldController(field);

    return (
        <FormControl fullWidth>
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
        </FormControl>
    )
}