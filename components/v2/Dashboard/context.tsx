import { createContext, useContext, useState } from "react";
import dashboard from "@/types/v2/dashboard/dashboard";


const DashboardContext = createContext<{
    settings: dashboard;
    mobileOpen: boolean;
    setMobileOpen: (mobileOpen: boolean) => void;
}>({
    settings: {} as dashboard,
    mobileOpen: false,
    setMobileOpen: () => { },
});

export const useDashboardContext = () => {
    return useContext(DashboardContext);
}

export const DashboardProvider = ({ 
    children,
    settings
}: { 
    children: React.ReactNode,
    settings: dashboard
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const value = {
        settings,
        mobileOpen,
        setMobileOpen,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}