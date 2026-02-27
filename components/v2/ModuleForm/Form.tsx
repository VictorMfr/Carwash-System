import { Grid } from "@mui/material";
import useModuleFormController from "./controller/controller";
import Vanilla from "./FormVariants/Vanilla/Vanilla";
import Stepper from "./FormVariants/Stepper/Stepper";

export default function Form() {

    const controller = useModuleFormController();

    return (
        <Grid container {...controller.settings.config}>
            {controller.formType === 'vanilla' && <Vanilla/>}
            {controller.formType === 'stepper' && <Stepper />}
        </Grid>
    )  
}