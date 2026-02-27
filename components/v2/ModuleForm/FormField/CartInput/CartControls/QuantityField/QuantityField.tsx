import { Grid, TextField } from "@mui/material";
import useQuantityFieldController from "./controller";

export default function QuantityField() {

    const controller = useQuantityFieldController();

    return (
        <Grid size={6} container spacing={1}>
            <TextField
                fullWidth
                size="small"
                label="Cantidad"
                value={controller.value}
                onChange={controller.changeQuantityHandler}
                type="number"
                helperText={controller.error}
                error={!!controller.error}
            />
        </Grid>
    )
}