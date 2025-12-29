import { useDashboardContext } from "../context";
import { useState } from "react";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import router from "next/router";

export default function useHeaderController() {

    const [optionsAnchorEl, setOptionsAnchorEl] = useState<null | HTMLElement>(null);
    const isOptionsOpen = Boolean(optionsAnchorEl);
    const uiContext = useUIDisplayControls();

    const dashboardContext = useDashboardContext();

    const handleOpenOptions = (event: React.MouseEvent<HTMLElement>) => {
        setOptionsAnchorEl(event.currentTarget);
    };

    const handleCloseOptions = () => {
        setOptionsAnchorEl(null);
    };

    const openMobileHandler = () => {
        dashboardContext.setMobileOpen(true);
    };

    const closeMobileHandler = () => {
        dashboardContext.setMobileOpen(false);
    };

    const handleLogout = () => {
        uiContext.setAlert({
            open: true,
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Logout',
                    onClick: async () => {
                        try {
                            uiContext.setLoading(true);
                            await api.post('/api/auth/logout');
                        } finally {
                            uiContext.setAlert(prev => ({ ...prev, open: false }));
                            router.push('/login');
                            uiContext.setLoading(false);
                        }
                    }
                }
            ]
        })
    }

    return {
        optionsAnchorEl,
        isOptionsOpen,
        dashboardContext,
        handleOpenOptions,
        handleCloseOptions,
        openMobileHandler,
        closeMobileHandler,
        handleLogout,
    }
}