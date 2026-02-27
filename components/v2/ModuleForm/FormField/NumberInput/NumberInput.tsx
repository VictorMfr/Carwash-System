import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import useGetFieldController from "../utils/useGetFieldController";
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";

export default function NumberInput({ field }: { field: formVanilla }) {
    if (!field.number) return null;

    const controller = useGetFieldController(field);

    const startAdornment = field.number.adornment && field.number.adornmentPosition === 'start' && <field.number.adornment/>;
    const endAdornment = field.number.adornment && field.number.adornmentPosition === 'end' && <field.number.adornment/>;

    return (
        <FormControl fullWidth error={!!controller.state.error}>
            <InputLabel id={field.id} htmlFor={field.id}>{field.headerName}</InputLabel>
            <OutlinedInput
                type="number"
                id={field.id}
                label={field.headerName}
                value={controller.state.value ?? ''}
                onChange={controller.onChange}
                fullWidth
                startAdornment={startAdornment}
                endAdornment={endAdornment}
                disabled={field.effects?.disable}
                {...controller.effects}
            />
            <FormHelperText error={!!controller.state.error}>{controller.state.error}</FormHelperText>
        </FormControl>
    )
}