import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits } from '@mui/icons-material';
import { AttachMoney } from '@mui/icons-material';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { Permissions } from "../../hooks/useUserPermissions";

export default function useQuickActionsGridController(permissions: Permissions) {
    const theme = useTheme();

    const quickActions = useMemo(() => {
        const actions = [
            {
                icon: BuildIcon,
                title: 'Nuevo servicio',
                description: 'Crea un nuevo servicio y gestiona la información fácilmente.',
                href: '/dashboard/service/form',
                color: theme.palette.primary.main,
                enabled: permissions.hasServiceControlPermission
            },
            {
                icon: ProductionQuantityLimits,
                title: 'Nuevo producto',
                description: 'Crea un nuevo producto y gestiona la información fácilmente.',
                href: '/dashboard/stock/form',
                color: theme.palette.info.main,
                enabled: permissions.hasStockControlPermission
            },
            {
                icon: AttachMoney,
                title: 'Nueva transacción',
                description: 'Crea una nueva transacción y gestiona la información fácilmente.',
                href: '/dashboard/finance/form',
                color: theme.palette.success.main,
                enabled: permissions.hasFinanceControlPermission
            },
        ];

        return actions.filter(action => action.enabled);
    }, [
        permissions.hasFinanceControlPermission,
        permissions.hasServiceControlPermission,
        permissions.hasStockControlPermission,
        theme.palette.info.main,
        theme.palette.primary.main,
        theme.palette.success.main,
    ]);

    return {
        quickActions
    }
}