import { Fragment } from "react";
import { Collapse, ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import { AttachMoney, ExpandLess, ExpandMore } from "@mui/icons-material";
import useFinanceGroupController from "./controller";
import TransactionsItem from "./TransactionsItem/TransactionsItem";
import AccountsItem from "./AccountsItem/AccountsItem";
import PaymentMethodsItem from "./PaymentMethodsItem/PaymentMethodsItem";

export default function FinanceGroupItem() {

    const controller = useFinanceGroupController();

    return (
        <Fragment>
            <ListItemButton
                onClick={controller.handleFinanceClick}
                sx={{ borderRadius: '5px' }}
            >
                <ListItemIcon>
                    <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Finanzas" />
                {controller.financeOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={controller.financeOpen} timeout="auto" unmountOnExit>
                <List>
                    <TransactionsItem />
                    <AccountsItem />
                    <PaymentMethodsItem />
                </List>
            </Collapse>
        </Fragment>
    )
}