import { Grid, Typography } from "@mui/material";
import SearchField from "./SearchField/SearchField";
import QuantityField from "./QuantityField/QuantityField";
import AddAction from "./AddAction/AddAction";

export default function CartControls() {
    return (
        <Grid size={12} container spacing={2}>
            <Typography variant="caption" color="text.secondary">Seleccione un item y una cantidad para agregar a la lista</Typography>
            <SearchField />
            <QuantityField />
            <AddAction />
        </Grid>
    )
}