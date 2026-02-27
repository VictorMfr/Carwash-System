'use client';

import { useEffect, useState } from "react";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useNavBarController() {
    const [userRole, setUserRole] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const uiContext = useUIDisplayControls();

    const [inventoryOpen, setInventoryOpen] = useState(false);
    const [financeOpen, setFinanceOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [marketingOpen, setMarketingOpen] = useState(false);

    const loadPermissions = async () => {
        try {
            const response = await fetch('/api/user/me');
            if (!response.ok) {
                return;
            }
            const user = await response.json();

            setUserRole(user.role);
        } catch {
            uiContext.setSnackbar({
                open: true,
                message: "Error al obtener el rol del usuario",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPermissions();
    }, []);

    const roles = {
        admin: "Administrador",
        inventory: "Auditor Inventario",
        finance: "Auditor Finanzas",
        support: "Soporte cliente",
        marketing: "Auditor Marketing",
        hr: "Auditor RRHH",
    };

    const hasRole = (...allowedRoles: string[]) =>
        userRole === roles.admin || allowedRoles.includes(userRole);

    const permissions = {
        dashboard: true,
        users: hasRole(roles.hr),
        inventoryGroup: hasRole(roles.inventory),
        inventoryItem: hasRole(roles.inventory),
        inventoryProducts: hasRole(roles.inventory),
        inventoryBrands: hasRole(roles.inventory),
        inventoryStates: hasRole(roles.inventory),
        financeGroup: hasRole(roles.finance),
        financeTransactions: hasRole(roles.finance),
        financeAccounts: hasRole(roles.finance),
        financeMethods: hasRole(roles.finance),
        servicesGroup: hasRole(roles.support),
        servicesOperations: hasRole(roles.support),
        servicesOperators: hasRole(roles.support),
        servicesRecipes: hasRole(roles.support),
        servicesVehicles: hasRole(roles.support),
        servicesVehicleModels: hasRole(roles.support),
        servicesVehicleBrands: hasRole(roles.support),
        servicesClients: hasRole(roles.support),
        marketingGroup: hasRole(roles.marketing),
        marketingClients: hasRole(roles.marketing),
        marketingFeedbacks: hasRole(roles.marketing),
        settings: hasRole(roles.admin),
        notifications: hasRole(roles.admin),
    };

    const groupVisibility = {
        inventoryGroup:
            permissions.inventoryItem ||
            permissions.inventoryProducts ||
            permissions.inventoryBrands ||
            permissions.inventoryStates,
        financeGroup:
            permissions.financeTransactions ||
            permissions.financeAccounts ||
            permissions.financeMethods,
        servicesGroup:
            permissions.servicesOperations ||
            permissions.servicesOperators ||
            permissions.servicesRecipes ||
            permissions.servicesVehicles ||
            permissions.servicesVehicleModels ||
            permissions.servicesVehicleBrands ||
            permissions.servicesClients,
        marketingGroup:
            permissions.marketingClients ||
            permissions.marketingFeedbacks,
    };

    return {
        userRole,
        loading,
        permissions,
        groupVisibility,
        inventoryOpen,
        financeOpen,
        servicesOpen,
        marketingOpen,
        setInventoryOpen,
        setFinanceOpen,
        setServicesOpen,
        setMarketingOpen,
    };
}
