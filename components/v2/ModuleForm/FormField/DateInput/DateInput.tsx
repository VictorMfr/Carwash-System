import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useDateInputController from "./controller";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";

export default function DateInput({ field }: { field: formVanilla }) {

    const { state, onChange, effects } = useDateInputController(field);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
                <DatePicker
                    slotProps={{ textField: { error: state.error !== '' } }}
                    label={field.headerName}
                    value={state.value ? dayjs(state.value, 'DD-MM-YYYY') : null}
                    onChange={onChange}
                    format="DD-MM-YYYY"
                    disabled={effects.disable}
                    
                />
            </FormControl>
        </LocalizationProvider>
    );
}