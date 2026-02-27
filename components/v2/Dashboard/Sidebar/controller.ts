import { useDashboardContext } from "../context";
import { DrawerProps, useMediaQuery } from "@mui/material";

export default function useSidebarController() {
    const dashboardContext = useDashboardContext();
    const variant: DrawerProps['variant'] = useMediaQuery('(max-width: 600px)') ? 'temporary' : 'permanent';
    
    const closeMobileHandler = () => {
        dashboardContext.setMobileOpen(false);
    };

    return {
        dashboardContext,
        variant,
        closeMobileHandler,
    }
}