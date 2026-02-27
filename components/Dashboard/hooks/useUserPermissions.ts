import { useEffect, useState } from "react";

export type Role = {
    name: string;
};

export type Permissions = {
    hasUsersControlPermission: boolean;
    hasRolesControlPermission: boolean;
    hasStockControlPermission: boolean;
    hasFinanceControlPermission: boolean;
    hasServiceControlPermission: boolean;
    hasMarketingControlPermission: boolean;
    hasSettingsControlPermission: boolean;
    hasNotificationsControlPermission: boolean;
};

export const defaultPermissions: Permissions = {
    hasUsersControlPermission: false,
    hasRolesControlPermission: false,
    hasStockControlPermission: false,
    hasFinanceControlPermission: false,
    hasServiceControlPermission: false,
    hasMarketingControlPermission: false,
    hasSettingsControlPermission: false,
    hasNotificationsControlPermission: false,
};

export function mapRolesToPermissions(roleName?: string): Permissions {
    const normalized = typeof roleName === "string" ? roleName.trim() : "";
    const isAdmin = normalized === "Administrador";

    const hasUsers = isAdmin || normalized === "Auditor RRHH";
    const hasRoles = hasUsers;
    const hasStock = isAdmin || normalized === "Auditor Inventario";
    const hasFinance = isAdmin || normalized === "Auditor Finanzas";
    const hasService = isAdmin || normalized === "Soporte cliente";
    const hasMarketing = isAdmin || normalized === "Auditor Marketing";
    const hasSettings = isAdmin;
    const hasNotifications = Boolean(normalized);

    return {
        hasUsersControlPermission: hasUsers,
        hasRolesControlPermission: hasRoles,
        hasStockControlPermission: hasStock,
        hasFinanceControlPermission: hasFinance,
        hasServiceControlPermission: hasService,
        hasMarketingControlPermission: hasMarketing,
        hasSettingsControlPermission: hasSettings,
        hasNotificationsControlPermission: hasNotifications,
    };
}

export default function useUserPermissions() {
    const [permissions, setPermissions] = useState<Permissions>(defaultPermissions);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadPermissions = async () => {
            try {
                const response = await fetch('/api/user/me');
                if (!response.ok) {
                    return;
                }
                const user = await response.json();
                if (cancelled) return;

                const roles = user.roles ?? user.Roles ?? [];
                const roleName =
                    user.role ??
                    user.Role?.name ??
                    (Array.isArray(roles) ? (roles[0]?.name ?? roles[0]) : undefined);
                setPermissions(mapRolesToPermissions(roleName));
            } catch {
                // Keep defaults on error
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadPermissions();

        return () => {
            cancelled = true;
        };
    }, []);

    return { permissions, loading };
}
