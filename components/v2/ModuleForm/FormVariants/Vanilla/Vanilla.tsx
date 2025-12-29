import { Grid } from "@mui/material";
import useVanillaController from "./controller";
import FormField from "../../FormField/FormField";

export default function Vanilla() {

    const controller = useVanillaController();

    return (
        <Grid container {...controller.gridConfig}>
            {controller.fields.map(field => {
                return (
                    <Grid key={field.field} size={field.size}>
                        <FormField field={field}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}