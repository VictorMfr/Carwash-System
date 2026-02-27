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
import useNavBarController from "./controller";

export default function NavBar() {


    const controller = useNavBarController();

    return (
        <List>
            <NavBarHeader />
            <DashboardItem />
            {controller.hasUsersControlPermission && <UsersItem />}
            {controller.hasRolesControlPermission && <RolesItem />}
            {controller.hasStockControlPermission && <StockGroupItem />}
            {controller.hasFinanceControlPermission && <FinanceGroupItem />}
            {controller.hasServiceControlPermission && <ServiceGroupItem />}
            {controller.hasMarketingControlPermission && <MarketingGroupItem />}
            <Divider />
            {controller.hasSettingsControlPermission && <SettingsItem />}
            {controller.hasNotificationsControlPermission && <NotificationsItem />}
        </List>
    )
}