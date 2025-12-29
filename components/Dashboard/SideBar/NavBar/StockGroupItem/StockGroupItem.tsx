import { Fragment } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import { Inventory, ExpandLess, ExpandMore } from "@mui/icons-material";
import useStockGroupController from "./controller";
import StockItem from "./StockItem/StockItem";
import ProductsItem from "./ProductsItem/ProductsItem";
import BrandsItem from "./BrandsItem/BrandsItem";
import StatesItem from "./StatesItem/StatesItem";

export default function StockGroupItem() {

    const controller = useStockGroupController();

    return (
        <Fragment>
            <ListItemButton
                onClick={controller.handleInventoryClick}
                sx={{ borderRadius: '5px' }}
            >
                <ListItemIcon>
                    <Inventory />
                </ListItemIcon>
                <ListItemText primary="Inventario" />
                {controller.inventoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
                in={controller.inventoryOpen}
                timeout="auto"
                unmountOnExit
            >
                <List>
                    <StockItem />
                    <ProductsItem />
                    <BrandsItem />
                    <StatesItem />
                </List>
            </Collapse>
        </Fragment>
    )
}