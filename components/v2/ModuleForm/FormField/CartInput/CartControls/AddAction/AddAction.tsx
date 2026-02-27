import { Grid, Button } from "@mui/material";
import useAddActionController from "./controller";

export default function AddAction() {

    const controller = useAddActionController();

    return (
        <Grid size={6}>
            <Button
                variant="contained"
                sx={{ height: '100%' }}
                fullWidth
                onClick={controller.addItemHandler}
            >
                Agregar
            </Button>
        </Grid>
    )
}