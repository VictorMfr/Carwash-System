import { useHeaderContext } from "../context";
import { useDashboardContext } from "@/components/Dashboard/context";

export default function useMenuController() {
    
    const headerCtx = useHeaderContext();
    const dashboardCtx = useDashboardContext();

    const handleMenuClick = () => {
        dashboardCtx.setMobileOpen(!dashboardCtx.mobileOpen);
    }
    
    return {
        mobileSize: headerCtx.mobileSize,
        handleMenuClick,
    }
}