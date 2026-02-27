import { Chip, Grid, Typography } from "@mui/material";
import ListItem from "./ListItem/ListItem";
import useCartListController from "./controller";

export default function CartList() {

    const controller = useCartListController();

    return (
        <Grid size={12} container spacing={1}>
            <Grid size={12}>
                <Typography variant="caption" color="text.secondary">Lista de productos</Typography>
            </Grid>
            <Grid size={12} container spacing={1} sx={{ maxHeight: 300, overflow: 'auto' }}>
                {controller.cart.length > 0 && controller.cart.map((item) => (
                    <ListItem key={item.product.id} item={item} />
                )) || (
                    <Chip
                        label="No hay productos en el carrito"
                        color="default"
                        variant="filled"
                    />
                )}
            </Grid>
        </Grid>
    )
}