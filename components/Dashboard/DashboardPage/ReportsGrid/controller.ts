import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Inventory2 } from "@mui/icons-material";
import { AttachMoney } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import { Assessment } from "@mui/icons-material";
import { Permissions } from "../../hooks/useUserPermissions";

export default function useReportsGridController(permissions: Permissions) {

    const theme = useTheme();

    const reports = useMemo(() => {
        const isAdmin = permissions.hasUsersControlPermission;

        const allReports = [
            {
                icon: BuildIcon,
                title: 'Reporte de servicios',
                description: 'Ver reportes de los servicios de la empresa.',
                href: '/reports/service',
                color: theme.palette.warning.main,
                enabled: permissions.hasServiceControlPermission
            },
            {
                icon: Inventory2,
                title: 'Reporte de inventario',
                description: 'Ver reportes del inventario de la empresa.',
                href: '/reports/stock',
                color: theme.palette.info.main,
                enabled: permissions.hasStockControlPermission
            },
            {
                icon: AttachMoney,
                title: 'Reporte de finanzas',
                description: 'Ver reportes de las finanzas de la empresa.',
                href: '/reports/finance',
                color: theme.palette.success.main,
                enabled: permissions.hasFinanceControlPermission
            },
            {
                icon: People,
                title: 'Reporte de clientes',
                description: 'Ver reportes de clientes y su actividad.',
                href: '/reports/client',
                color: theme.palette.secondary.main,
                enabled: isAdmin
            },
        ];

        return allReports.filter(report => report.enabled);
    }, [
        permissions.hasFinanceControlPermission,
        permissions.hasServiceControlPermission,
        permissions.hasStockControlPermission,
        permissions.hasUsersControlPermission,
        theme.palette.info.main,
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
    ]);

    return {
        reports
    }
}