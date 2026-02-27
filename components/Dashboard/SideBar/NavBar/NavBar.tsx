'use client';

import { Fragment } from "react";
import {
    List,
    Divider,
    ListItem,
    Typography,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Skeleton,
} from "@mui/material";
import Link from "next/link";
import {
    Home,
    People,
    Inventory,
    ExpandLess,
    ExpandMore,
    AttachMoney,
    LocalCarWash,
    Group,
    Settings,
    Notifications,
    ProductionQuantityLimits,
    Business,
    Assessment,
    AccountBalance,
    Payment,
    Engineering,
    MenuBook,
    DirectionsCar,
    ModelTraining,
    BusinessCenter,
    Feedback,
} from "@mui/icons-material";
import useNavBarController from "./controller";

export default function NavBar() {
    const controller = useNavBarController();

    return (
        <List sx={{ gap: 0.5, display: 'flex', flexDirection: 'column', paddingRight: 1, paddingLeft: 1 }}>
            <ListItem>
                <Typography variant="h6">Panel de control</Typography>
            </ListItem>
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.permissions.dashboard ? (
                <Link href="/dashboard">
                    <ListItemButton sx={{ borderRadius: '5px' }}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </Link>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.permissions.users ? (
                <Link href="/dashboard/users">
                    <ListItemButton sx={{ borderRadius: '5px' }}>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItemButton>
                </Link>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.groupVisibility.inventoryGroup ? (
                <Fragment>
                    <ListItemButton
                        onClick={() => controller.setInventoryOpen(prev => !prev)}
                        sx={{ borderRadius: '5px' }}
                    >
                        <ListItemIcon>
                            <Inventory />
                        </ListItemIcon>
                        <ListItemText primary="Inventario" />
                        {controller.inventoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={controller.inventoryOpen} timeout="auto" unmountOnExit>
                        <List>
                            {controller.permissions.inventoryItem ? (
                                <Link href="/dashboard/stock">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Inventory />
                                        </ListItemIcon>
                                        <ListItemText primary="Inventario" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.inventoryProducts ? (
                                <Link href="/dashboard/stock/product">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <ProductionQuantityLimits />
                                        </ListItemIcon>
                                        <ListItemText primary="Productos" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.inventoryBrands ? (
                                <Link href="/dashboard/stock/brand">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Business />
                                        </ListItemIcon>
                                        <ListItemText primary="Marcas" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.inventoryStates ? (
                                <Link href="/dashboard/stock/state">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Assessment />
                                        </ListItemIcon>
                                        <ListItemText primary="Estados" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                        </List>
                    </Collapse>
                </Fragment>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.groupVisibility.financeGroup ? (
                <Fragment>
                    <ListItemButton
                        onClick={() => controller.setFinanceOpen(prev => !prev)}
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
                            {controller.permissions.financeTransactions ? (
                                <Link href="/dashboard/finance">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <AttachMoney />
                                        </ListItemIcon>
                                        <ListItemText primary="Transacciones" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.financeAccounts ? (
                                <Link href="/dashboard/finance/account">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <AccountBalance />
                                        </ListItemIcon>
                                        <ListItemText primary="Cuentas" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.financeMethods ? (
                                <Link href="/dashboard/finance/method">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Payment />
                                        </ListItemIcon>
                                        <ListItemText primary="Métodos de pago" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                        </List>
                    </Collapse>
                </Fragment>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.groupVisibility.servicesGroup ? (
                <Fragment>
                    <ListItemButton
                        onClick={() => controller.setServicesOpen(prev => !prev)}
                        sx={{ borderRadius: '5px' }}
                    >
                        <ListItemIcon>
                            <LocalCarWash />
                        </ListItemIcon>
                        <ListItemText primary="Servicios" />
                        {controller.servicesOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={controller.servicesOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {controller.permissions.servicesOperations ? (
                                <Link href="/dashboard/service">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <LocalCarWash />
                                        </ListItemIcon>
                                        <ListItemText primary="Operaciones" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesOperators ? (
                                <Link href="/dashboard/service/operator">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Engineering />
                                        </ListItemIcon>
                                        <ListItemText primary="Operadores" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesRecipes ? (
                                <Link href="/dashboard/service/recipe">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <MenuBook />
                                        </ListItemIcon>
                                        <ListItemText primary="Recetas" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesVehicles ? (
                                <Link href="/dashboard/service/vehicle">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <DirectionsCar />
                                        </ListItemIcon>
                                        <ListItemText primary="Vehículos" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesVehicleModels ? (
                                <Link href="/dashboard/service/vehicle/model">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <ModelTraining />
                                        </ListItemIcon>
                                        <ListItemText primary="Modelos" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesVehicleBrands ? (
                                <Link href="/dashboard/service/vehicle/brand">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <BusinessCenter />
                                        </ListItemIcon>
                                        <ListItemText primary="Marcas de vehículos" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.servicesClients ? (
                                <Link href="/dashboard/client">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText primary="Clientes" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                        </List>
                    </Collapse>
                </Fragment>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.groupVisibility.marketingGroup ? (
                <Fragment>
                    <ListItemButton
                        onClick={() => controller.setMarketingOpen(prev => !prev)}
                        sx={{ borderRadius: '5px' }}
                    >
                        <ListItemIcon>
                            <Group />
                        </ListItemIcon>
                        <ListItemText primary="Marketing" />
                        {controller.marketingOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={controller.marketingOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {controller.permissions.marketingClients ? (
                                <Link href="/dashboard/marketing">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText primary="Clientes" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                            {controller.permissions.marketingFeedbacks ? (
                                <Link href="/dashboard/marketing/feedback">
                                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                                        <ListItemIcon>
                                            <Feedback />
                                        </ListItemIcon>
                                        <ListItemText primary="Comentarios" />
                                    </ListItemButton>
                                </Link>
                            ) : null}
                        </List>
                    </Collapse>
                </Fragment>
            ) : null}
            <Divider />
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.permissions.settings ? (
                <Link href="/dashboard/settings">
                    <ListItemButton sx={{ borderRadius: '5px' }}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItemButton>
                </Link>
            ) : null}
            {controller.loading ? (
                <Skeleton variant="rounded" height={48} />
            ) : controller.permissions.notifications ? (
                <Link href="/dashboard/notification">
                    <ListItemButton sx={{ borderRadius: '5px' }}>
                        <ListItemIcon>
                            <Notifications />
                        </ListItemIcon>
                        <ListItemText primary="Notificaciones" />
                    </ListItemButton>
                </Link>
            ) : null}
        </List>
    )
}
