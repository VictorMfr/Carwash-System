import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits } from '@mui/icons-material';
import { AttachMoney } from '@mui/icons-material';
import { useTheme } from '@mui/material';

export default function useQuickActionsGridController() {
    const theme = useTheme();

    const quickActions = [
        {
            icon: BuildIcon,
            title: 'Nuevo servicio',
            description: 'Crea un nuevo servicio y gestiona la información fácilmente.',
            href: '/dashboard/service/form',
            color: theme.palette.primary.main
        },
        {
            icon: ProductionQuantityLimits,
            title: 'Nuevo producto',
            description: 'Crea un nuevo producto y gestiona la información fácilmente.',
            href: '/dashboard/stock/form',
            color: theme.palette.info.main
        },
        {
            icon: AttachMoney,
            title: 'Nueva transacción',
            description: 'Crea una nueva transacción y gestiona la información fácilmente.',
            href: '/dashboard/finance/form',
            color: theme.palette.success.main
        },
    ];

    return {
        quickActions
    }
}