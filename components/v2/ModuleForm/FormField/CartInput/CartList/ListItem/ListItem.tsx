
import { ListItem as MuiListItem, Grid, Card } from "@mui/material";
import Picture from "./Picture/Picture";
import Text from "./Text/Text";
import DeleteAction from "./DeleteAction/DeleteAction";
import { CartItem } from "../../context";
import useListItemController from "./controller";


export default function ListItem({ item }: { item: CartItem }) {


    const controller = useListItemController();

    return (
        <Grid size={controller.gridSize}>
            <Card variant="outlined">
                <MuiListItem>
                    <Picture picture={item.product.picture}/>
                    <Text title={item.product.name} subtitle={`Cantidad: ${item.quantity}`} />
                    <DeleteAction itemId={item.product.id}/>
                </MuiListItem>
            </Card>
        </Grid>
    );
}

