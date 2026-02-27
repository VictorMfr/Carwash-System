import { Autocomplete } from "@mui/material";
import useAutocompleteInputController from "./controller/controller";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { Fragment } from "react";
import Modal from "./Modal/Modal";


const AutocompleteInput = () => {

    const controller = useAutocompleteInputController();

    if (!controller) return null;

    return (
        <Fragment>
            <Autocomplete
                {...controller.safeProps}
                fullWidth
                value={controller.value}
                options={controller.data}
                renderInput={controller.renderInput}
                loading={controller.loading}
                onChange={controller.onChange}
                getOptionLabel={controller.getOptionLabel}
                filterOptions={controller.filterOptionsHandler}
                selectOnFocus
                handleHomeEndKeys
                clearOnBlur
                disabled={controller.autocompleteCtx.effects.disabled}
                {...controller.autocompleteCtx.field.effects}
            />
            <Modal/>
        </Fragment>
    );
}

export default withUIDisplayControls(AutocompleteInput);