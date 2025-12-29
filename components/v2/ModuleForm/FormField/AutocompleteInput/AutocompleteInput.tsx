import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { Autocomplete } from "@mui/material";
import useAutocompleteInputController from "./controller/controller";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const AutocompleteInput = ({ field }: { field: formVanilla }) => {

    if (!field.autocomplete) return null;

    const controller = useAutocompleteInputController(field);
    if (!controller) return null;

    return (
        <Autocomplete
            {...controller.safeProps}
            fullWidth
            value={controller.value}
            options={controller.data}
            renderInput={controller.renderInput}
            loading={controller.loading}
            onChange={controller.onChange}
            getOptionLabel={controller.getOptionLabel}
            {...field.effects}
        />
    );
}

export default withUIDisplayControls(AutocompleteInput);