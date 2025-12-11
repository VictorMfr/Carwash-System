"use client";

import { 
    CardContent, 
    Card, 
    Grid, 
    Typography, 
    CardHeader, 
    Stack, 
    CardActionArea, 
    LinearProgress, 
    Skeleton, 
    List, 
    ListItem, 
    ListItemText, 
    Divider, 
    ListItemIcon,
    Box,
    Avatar,
    Chip,
    Theme,
    SxProps,
    alpha,
    useTheme
} from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import { ProductionQuantityLimits, AttachMoney, BarChart, AccessTime, Assessment, Inventory2, People, Paid, Notifications, Storage, TrendingUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import DashboardPageController from "./DashboardPageController";

export default function DashboardPage() {
    const theme = useTheme();
    const controller = DashboardPageController();
    const [dollarRates, setDollarRates] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<{ id: string, title: string, subtitle?: string }[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (res.ok) {
                    const data = await res.json();
                    setDollarRates(Array.isArray(data) ? data : []);
                }

                const [svcRes, trxRes] = await Promise.all([
                    fetch('/api/service'),
                    fetch('/api/finance')
                ]);
                const items: { id: string, title: string, subtitle?: string }[] = [];
                if (svcRes.ok) {
                    const services = await svcRes.json();
                    (services || []).slice(0, 3).forEach((s: any) => {
                        items.push({
                            id: `svc-${s.id}`,
                            title: `Servicio ${s.recipeName ?? ''} - ${s.status ?? ''}`.trim(),
                            subtitle: `${dayjs(s.date).format('DD/MM/YYYY')} • ${s.client ?? ''}`.trim()
                        });
                    });
                }
                if (trxRes.ok) {
                    const txs = await trxRes.json();
                    (txs || []).slice(0, 3).forEach((t: any) => {
                        const isIncome = Number(t.amount) >= 0;
                        items.push({
                            id: `tx-${t.id}`,
                            title: `${isIncome ? 'Ingreso' : 'Costo'} Bs. ${Math.abs(Number(t.amount)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                            subtitle: `${dayjs(t.date).format('DD/MM/YYYY')} • ${t.account ?? ''}`.trim()
                        });
                    });
                }
                setNotifications(items);
            } catch (e) {
                // ignore
            }
        };
        load();
    }, []);

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
            href: '/dashboard/transaction/form',
            color: theme.palette.success.main
        },
    ];

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

    return (
        <Box sx={styles.container}>
            <Grid container spacing={3}>
                <Grid container rowSpacing={3} size={{ xs: 12, md: 8 }}>
                    {/* Bienvenida */}
                    <Grid size={12}>
                        <Stack spacing={1.5}>
                            <Typography variant="h4" component="h1" sx={styles.welcomeTitle}>
                                Bienvenido al dashboard
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={styles.welcomeSubtitle}>
                                Gestiona tu autolavado desde un solo lugar
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Almacenamiento */}
                    {controller.dbMeta ? (
                        <Grid size={12}>
                            <Card variant="outlined" sx={styles.storageCard}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Avatar sx={styles.storageIcon}>
                                                <Storage />
                                            </Avatar>
                                            <Stack>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Almacenamiento disponible
                                                </Typography>
                                                <Typography variant="h6" sx={styles.storageTitle}>
                                                    {controller.dbMeta[0].tamaño_mb} MB / 500 MB
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(controller.dbMeta[0].tamaño_mb / 500) * 100}
                                            sx={styles.progress}
                                        />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ) : (
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={100} width={'100%'} />
                        </Grid>
                    )}

                    {/* Acciones rápidas */}
                    <Grid size={12}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={styles.sectionHeader}>
                            <Avatar sx={styles.sectionIconAvatar}>
                                <BoltIcon sx={styles.sectionIcon} />
                            </Avatar>
                            <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                                Acciones rápidas
                            </Typography>
                        </Stack>
                    </Grid>
                    {quickActions.map((action, idx) => {
                        const IconComponent = action.icon;
                        return (
                            <Grid size={{ xs: 12, md: 6 }} key={idx}>
                                <Card variant="outlined" sx={styles.actionCard}>
                                    <CardActionArea component={Link} href={action.href} sx={styles.cardAction}>
                                        <CardContent sx={styles.cardContent}>
                                            <Stack spacing={2}>
                                                <Box sx={styles.iconContainer}>
                                                    <Avatar sx={{
                                                        ...styles.actionIcon,
                                                        bgcolor: alpha(action.color, 0.1),
                                                        color: action.color
                                                    }}>
                                                        <IconComponent />
                                                    </Avatar>
                                                </Box>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="h6" component="h3" sx={styles.cardTitle}>
                                                        {action.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={styles.cardDescription}>
                                                        {action.description}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}

                    {/* Reportes */}
                    <Grid size={12}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={styles.sectionHeader}>
                            <Avatar sx={styles.sectionIconAvatar}>
                                <BarChart sx={styles.sectionIcon} />
                            </Avatar>
                            <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                                Reportes
                            </Typography>
                        </Stack>
                    </Grid>
                    {reports.map((report, idx) => {
                        const IconComponent = report.icon;
                        return (
                            <Grid size={{ xs: 12, md: 6 }} key={idx}>
                                <Card variant="outlined" sx={styles.actionCard}>
                                    <CardActionArea component={Link} href={report.href} sx={styles.cardAction}>
                                        <CardContent sx={styles.cardContent}>
                                            <Stack spacing={2}>
                                                <Box sx={styles.iconContainer}>
                                                    <Avatar sx={{
                                                        ...styles.actionIcon,
                                                        bgcolor: alpha(report.color, 0.1),
                                                        color: report.color
                                                    }}>
                                                        <IconComponent />
                                                    </Avatar>
                                                </Box>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="h6" component="h3" sx={styles.cardTitle}>
                                                        {report.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={styles.cardDescription}>
                                                        {report.description}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Información de la empresa */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined" sx={styles.infoCard}>
                        <CardHeader 
                            title="Información de la empresa" 
                            sx={styles.cardHeader}
                        />
                        <CardContent>
                            <Stack spacing={2}>
                                <Box sx={styles.dateChipContainer}>
                                    <Chip 
                                        label={dayjs().format('DD/MM/YYYY')} 
                                        size="small"
                                        sx={styles.dateChip}
                                    />
                                </Box>
                                <Stack spacing={3}>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <TrendingUp sx={{ fontSize: 20, color: 'success.main' }} />
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Tasas del dólar
                                        </Typography>
                                    </Stack>
                                    <List dense disablePadding>
                                        {dollarRates.length > 0 ? (
                                            dollarRates.map((r: any) => (
                                                <ListItem key={r.nombre} disableGutters sx={styles.listItem}>
                                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                                        <Avatar sx={styles.listIcon}>
                                                            <Paid sx={{ fontSize: 18 }} />
                                                        </Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2" sx={styles.listPrimary}>
                                                                {r.nombre}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography variant="body2" sx={styles.listSecondary}>
                                                                Bs. {Number(r.promedio ?? r.precio ?? 0).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem disableGutters>
                                                <ListItemText 
                                                    primary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            No se pudieron cargar las tasas.
                                                        </Typography>
                                                    } 
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Stack>

                                <Divider />

                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Notifications sx={{ fontSize: 20, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Últimas notificaciones
                                        </Typography>
                                    </Stack>
                                    <List dense disablePadding>
                                        {notifications.length > 0 ? (
                                            notifications.map(n => (
                                                <ListItem key={n.id} disableGutters sx={styles.listItem}>
                                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                                        <Avatar sx={styles.listIcon}>
                                                            <Notifications sx={{ fontSize: 18 }} />
                                                        </Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2" sx={styles.listPrimary}>
                                                                {n.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography variant="caption" color="text.secondary">
                                                                {n.subtitle}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem disableGutters>
                                                <ListItemText 
                                                    primary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            Sin notificaciones recientes.
                                                        </Typography>
                                                    } 
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        p: { xs: 2, md: 3 },
    },
    welcomeTitle: {
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2rem' },
        lineHeight: 1.2,
    },
    welcomeSubtitle: {
        fontSize: { xs: '0.9375rem', md: '1rem' },
        lineHeight: 1.5,
    },
    storageCard: {
        borderRadius: 2,
    },
    storageIcon: {
        width: 48,
        height: 48,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
    },
    storageTitle: {
        fontWeight: 600,
    },
    progress: {
        height: 8,
        borderRadius: 4,
    },
    sectionHeader: {
        mb: 2,
        mt: 1,
    },
    sectionIconAvatar: {
        width: 40,
        height: 40,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
    },
    sectionIcon: {
        fontSize: 20,
    },
    sectionTitle: {
        fontWeight: 700,
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.2,
    },
    actionCard: {
        borderRadius: 2,
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
    },
    cardAction: {
        height: '100%',
    },
    cardContent: {
        p: 3,
        height: '100%',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    actionIcon: {
        width: 56,
        height: 56,
    },
    cardTitle: {
        fontWeight: 600,
        fontSize: { xs: '1rem', md: '1.125rem' },
        lineHeight: 1.3,
    },
    cardDescription: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
    },
    infoCard: {
        borderRadius: 2,
        height: 'fit-content',
        position: 'sticky',
        top: 24,
    },
    cardHeader: {
        pb: 1,
    },
    dateChipContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 1,
    },
    dateChip: {
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 500,
    },
    listItem: {
        py: 1,
    },
    listIcon: {
        width: 32,
        height: 32,
        bgcolor: 'action.hover',
        color: 'text.secondary',
    },
    listPrimary: {
        fontWeight: 500,
        fontSize: '0.875rem',
    },
    listSecondary: {
        fontWeight: 600,
        fontSize: '0.875rem',
        color: 'text.primary',
    },
}
