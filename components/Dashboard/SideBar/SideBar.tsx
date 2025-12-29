'use client';

import { Drawer, SxProps, Theme } from "@mui/material";
import NavBar from "./NavBar/NavBar";
import useSideBarController from "./controller";

export default function SideBar() {

    const controller = useSideBarController();

    const styleConfig: SxProps<Theme> = {
        ...styles.drawer,
        maxHeight: controller.variant === 'temporary' ? '100vh' : '90vh',
    }

    return (
        <Drawer
            variant={controller.variant}
            open={controller.dashboardContext.mobileOpen}
            sx={styleConfig}
            slotProps={{ root: { keepMounted: true } }}
            onClose={controller.closeMobileHandler}
        >
            <NavBar />
        </Drawer>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    drawer: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            width: 240,
            overflowY: 'auto',
            scrollbarColor: '#888 transparent',
            scrollbarWidth: 'thin',
        },
    },
}