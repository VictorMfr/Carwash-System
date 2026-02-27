import { Autocomplete, Grid } from "@mui/material";
import useSearchFieldController from "./controller";


export default function SearchField() {

    const controller = useSearchFieldController();
    if (!controller) return null;

    return (
        <Grid size={12}>
            <Autocomplete
                {...controller.safeProps}
                fullWidth
                options={controller.data}
                loading={controller.loading}
                value={controller.value}
                inputValue={controller.inputValue}
                onInputChange={controller.onInputChange}
                onChange={controller.onChange}
                getOptionLabel={controller.getOptionLabel}
                filterOptions={controller.filterOptionsHandler}
                selectOnFocus
                handleHomeEndKeys
                clearOnBlur
                renderInput={controller.renderInput}
            />
        </Grid>
    );
}