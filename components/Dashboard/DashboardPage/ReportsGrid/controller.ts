import { useTheme } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Inventory2 } from "@mui/icons-material";
import { AttachMoney } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import { Assessment } from "@mui/icons-material";

export default function useReportsGridController() {

    const theme = useTheme();

    const reports = [
        {
            icon: BuildIcon,
            title: 'Reporte de servicios',
            description: 'Ver reportes de los servicios de la empresa.',
            href: '/reports/service',
            color: theme.palette.warning.main
        },
        {
            icon: Inventory2,
            title: 'Reporte de inventario',
            description: 'Ver reportes del inventario de la empresa.',
            href: '/reports/stock',
            color: theme.palette.info.main
        },
        {
            icon: AttachMoney,
            title: 'Reporte de finanzas',
            description: 'Ver reportes de las finanzas de la empresa.',
            href: '/reports/finance',
            color: theme.palette.success.main
        },
        {
            icon: People,
            title: 'Reporte de clientes',
            description: 'Ver reportes de clientes y su actividad.',
            href: '/reports/client',
            color: theme.palette.secondary.main
        },
        {
            icon: Assessment,
            title: 'Reporte global',
            description: 'Ver todos los reportes consolidados.',
            href: '/reports/all',
            color: theme.palette.primary.main
        },
    ];

    return {
        reports
    }
}