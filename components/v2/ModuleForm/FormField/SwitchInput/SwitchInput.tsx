import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { FormControlLabel, Switch } from "@mui/material";
import useVanillaSwitchController from "./controller/controller";

export default function SwitchInput({ field }: { field: formVanilla }) {
    if (!field.switch) return null;

    const controller = useVanillaSwitchController(field);

    if (!controller) return null;

    return (
        <FormControlLabel
            control={(
                <Switch
                    checked={controller.state.value}
                    onChange={controller.onChange}
                    {...controller.props}
                    disabled={field.effects?.disable}
                />
            )}
            label={field.headerName}
        />
    );
}