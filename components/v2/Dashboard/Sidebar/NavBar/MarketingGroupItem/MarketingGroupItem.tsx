import { Fragment } from "react";
import { Link, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandMore, ExpandLess, Group } from "@mui/icons-material";
import useMarketingGroupController from "./controller";
import ClientsItem from "./ClientsItem/ClientsItem";
import FeedbacksItem from "./FeedbacksItem/FeedbacksItem";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import OpinionTypesItem from "./OpinionTypesItem/OpinionTypesItem";

export default function MarketingGroupItem() {

    const controller = useMarketingGroupController();

    return (
        <Fragment>
            <ListItemButton onClick={controller.handleMarketingClick} sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Marketing" />
                {controller.marketingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={controller.marketingOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ClientsItem />
                    <FeedbacksItem />
                    <CategoriesItem />
                    <OpinionTypesItem />
                </List>
            </Collapse>
        </Fragment>
    )
}