import { Autocomplete, Avatar, Button, Card, Divider, Grid, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import useRecipeCartInputController from "./controller";


const RecipeCartInput = ({
    field,
}: {
    field?: formVanilla;
}) => {

    const controller = useRecipeCartInputController(field);

    return (
        <Grid container spacing={1}>
            <Grid size={12}>
                <Typography variant="caption">Seleccione una receta y llena la lista de productos utilizados</Typography>
            </Grid>
            <Grid size={12}>
                <Autocomplete
                    value={controller.selectedRecipe}
                    options={controller.recipeOptions}
                    getOptionLabel={controller.getOptionLabel}
                    renderInput={(params) => <TextField {...params} label="Receta" />}
                    onChange={controller.changeSelectedRecipe}
                    filterOptions={controller.filterOptionsHandler}
                    loading={controller.loading}
                    fullWidth
                    size="small"
                />
            </Grid>
            <Grid size={12}>
                <Autocomplete
                    value={controller.selectedProduct}
                    options={controller.productOptions}
                    getOptionLabel={controller.getOptionLabel}
                    renderInput={(params) => <TextField {...params} label="Producto" />}
                    onChange={controller.changeSelectedProduct}
                    filterOptions={controller.filterOptionsHandler}
                    loading={controller.loading}
                    fullWidth
                    size="small"
                />
            </Grid>
            <Grid size={6}>
                <TextField
                    label="Cantidad"
                    type="number"
                    fullWidth
                    size="small"
                    value={controller.quantity}
                    onChange={controller.changeQuantity}
                />
            </Grid>
            <Grid size={6}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: '100%' }}
                    fullWidth
                    onClick={controller.addItemToCart}
                >
                    Agregar
                </Button>
            </Grid>

            <Grid size={12}>
                {controller.cart.map((item: any, index: number) => (
                    <Grid size={controller.isSmallScreen ? 12: 4} key={item.product?.id ?? index}>
                        <Card variant="outlined">
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={item.product?.picture} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.product?.name}
                                    secondary={`Cantidad: ${item.quantity}`}
                                />
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => controller.removeItemFromCart(item.product?.id, index)}
                                >
                                    Eliminar
                                </Button>
                            </ListItem>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid size={12}>
                <Divider />
            </Grid>
        </Grid>
    )
};

export default withUIDisplayControls(RecipeCartInput);