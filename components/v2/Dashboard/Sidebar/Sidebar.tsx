import sidebar from "@/types/v2/dashboard/sidebar/sidebar";
import { Drawer, Theme, SxProps } from "@mui/material";
import useSidebarController from "./controller";
import NavBar from "./NavBar/NavBar";

export default function Sidebar({ settings }: { settings: sidebar }) {


    const controller = useSidebarController();

    return (
        <Drawer
            variant={controller.variant}
            open={controller.dashboardContext.mobileOpen}
            sx={styles.drawer}
            slotProps={{ root: { keepMounted: true } }}
            onClose={controller.closeMobileHandler}
        >
            <NavBar />
        </Drawer>
    );
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