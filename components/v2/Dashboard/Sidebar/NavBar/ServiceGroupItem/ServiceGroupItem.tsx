import { Fragment } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import { LocalCarWash, ExpandLess, ExpandMore } from "@mui/icons-material";
import useServiceGroupController from "./controller";
import ServicesItem from "./ServicesItem/ServicesItem";
import OperatorsItem from "./OperatorsItem/OperatorsItem";
import RecipesItem from "./RecipesItem/RecipesItem";
import VehiclesItem from "./VehiclesItem/VehiclesItem";
import VehicleModelsItem from "./VehicleModelsItem/VehicleModelsItem";
import VehicleBrandsItem from "./VehicleBrandsItem/VehicleBrandsItem";
import ClientsItem from "./ClientsItem/ClientsItem";

export default function ServiceGroupItem() {

    const controller = useServiceGroupController();

    return (
        <Fragment>
            <ListItemButton onClick={controller.handleServicesClick} sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <LocalCarWash />
                </ListItemIcon>
                <ListItemText primary="Servicios" />
                {controller.servicesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={controller.servicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ServicesItem />
                    <OperatorsItem />
                    <RecipesItem />
                    <VehiclesItem />
                    <VehicleModelsItem />
                    <VehicleBrandsItem />
                    <ClientsItem />
                </List>
            </Collapse>
        </Fragment>
    )
}