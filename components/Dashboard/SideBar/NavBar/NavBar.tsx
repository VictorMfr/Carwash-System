'use client';

import { List, Divider } from "@mui/material";
import NavBarHeader from "./NavBarHeader/NavBarHeader";
import DashboardItem from "./DashboardItem/DashboardItem";
import UsersItem from "./UsersItem/UsersItem";
import RolesItem from "./RolesItem/RolesItem";
import StockGroupItem from "./StockGroupItem/StockGroupItem";
import FinanceGroupItem from "./FinanceGroupItem/FinanceGroupItem";
import ServiceGroupItem from "./ServiceGroupItem/ServiceGroupItem";
import MarketingGroupItem from "./MarketingGroupItem/MarketingGroupItem";
import SettingsItem from "./SettingsItem/SettingsItem";
import NotificationsItem from "./NotificationsItem/NotificationsItem";

export default function NavBar() {

    return (
        <List>
            <NavBarHeader />
            <DashboardItem />
            <UsersItem />
            <RolesItem />
            <StockGroupItem />
            <FinanceGroupItem />
            <ServiceGroupItem />
            <MarketingGroupItem />
            <Divider />
            <SettingsItem />
            <NotificationsItem />
        </List>
    )
}