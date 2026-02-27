'use client';

import { useEffect, useState } from "react";

type Role = {
    name: string;
};

type Permissions = {
    hasUsersControlPermission: boolean;
    hasRolesControlPermission: boolean;
    hasStockControlPermission: boolean;
    hasFinanceControlPermission: boolean;
    hasServiceControlPermission: boolean;
    hasMarketingControlPermission: boolean;
    hasSettingsControlPermission: boolean;
    hasNotificationsControlPermission: boolean;
};

const initialPermissions: Permissions = {
    hasUsersControlPermission: false,
    hasRolesControlPermission: false,
    hasStockControlPermission: false,
    hasFinanceControlPermission: false,
    hasServiceControlPermission: false,
    hasMarketingControlPermission: false,
    hasSettingsControlPermission: false,
    hasNotificationsControlPermission: false,
};

function mapRolesToPermissions(roles: Role[] = []): Permissions {
    const roleNames = roles.map(role => role.name);

    const isAdmin = roleNames.includes('Administrator');
    const hasStock = isAdmin || roleNames.includes('Stock Manager');
    const hasService = isAdmin || roleNames.includes('Maintenance Manager');
    const hasFinance = isAdmin || roleNames.includes('Finance Manager');

    return {
        hasUsersControlPermission: isAdmin,
        hasRolesControlPermission: isAdmin,
        hasStockControlPermission: hasStock,
        hasFinanceControlPermission: hasFinance,
        hasServiceControlPermission: hasService,
        hasMarketingControlPermission: isAdmin,
        hasSettingsControlPermission: isAdmin,
        hasNotificationsControlPermission: isAdmin,
    };
}

export default function useNavBarController() {
    const [permissions, setPermissions] = useState<Permissions>(initialPermissions);

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
                setPermissions(mapRolesToPermissions(roles));
            } catch {
                // Keep defaults on error
            }
        };

        loadPermissions();

        return () => {
            cancelled = true;
        };
    }, []);

    return permissions;
}