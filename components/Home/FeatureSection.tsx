import { 
    Box, 
    Container, 
    Stack, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Avatar, 
    Theme, 
    SxProps,
    useTheme,
    alpha
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import AppsIcon from "@mui/icons-material/Apps";

export default function FeatureSection() {
    const theme = useTheme();
    
    const features = [
        { 
            icon: EventAvailableIcon, 
            title: 'Agenda inteligente', 
            desc: 'Organiza turnos, tiempos y estados en tiempo real.',
            color: theme.palette.primary.main
        },
        { 
            icon: PeopleAltIcon, 
            title: 'Clientes y fidelización', 
            desc: 'Historial, preferencias y comunicación efectiva.',
            color: theme.palette.secondary.main || theme.palette.info.main
        },
        { 
            icon: Inventory2Icon, 
            title: 'Inventario y stock', 
            desc: 'Control por lotes, costos y mínimos de reposición.',
            color: theme.palette.success.main
        },
        { 
            icon: ReceiptLongIcon, 
            title: 'Caja y finanzas', 
            desc: 'Ingresos/egresos, métodos de pago y reportes.',
            color: theme.palette.warning.main
        },
        { 
            icon: TrendingUpIcon, 
            title: 'Reportes y métricas', 
            desc: 'Indicadores clave para decisiones rápidas.',
            color: theme.palette.error.main
        },
        { 
            icon: SecurityIcon, 
            title: 'Roles y seguridad', 
            desc: 'Permisos por usuario y auditoría básica.',
            color: theme.palette.info.main
        },
    ];

    return (
        <Box sx={styles.section}>
            <Container maxWidth="lg" sx={styles.container}>
                <Stack spacing={6}>
                    <Box sx={styles.header}>
                        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={styles.titleContainer}>
                            <AppsIcon sx={styles.titleIcon} />
                            <Typography 
                                variant="h4" 
                                component="h2"
                                sx={styles.title}
                                textAlign="center"
                            >
                                Todo lo que necesitas en un solo lugar
                            </Typography>
                        </Stack>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={styles.description}
                            textAlign="center"
                        >
                            Herramientas poderosas diseñadas para optimizar tu autolavado
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                        {features.map((feature, idx) => {
                            const IconComponent = feature.icon;
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                                    <Card 
                                        sx={styles.card}
                                        elevation={0}
                                    >
                                        <CardContent sx={styles.cardContent}>
                                            <Box sx={styles.iconContainer}>
                                                <Avatar 
                                                    sx={{
                                                        ...styles.iconAvatar,
                                                        bgcolor: alpha(feature.color, 0.1),
                                                        color: feature.color,
                                                    }}
                                                >
                                                    <IconComponent sx={{ fontSize: 24 }} />
                                                </Avatar>
                                            </Box>
                                            <Typography 
                                                variant="h6" 
                                                component="h3"
                                                sx={styles.cardTitle}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={styles.cardDesc}
                                            >
                                                {feature.desc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Stack>
            </Container>
        </Box>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    section: {
        py: { xs: 3, md: 4 },
        bgcolor: 'background.default',
    },
    container: {
        px: 2,
    },
    header: {
        mb: 0,
    },
    titleContainer: {
        mb: 2,
    },
    titleIcon: {
        fontSize: { xs: '2rem', md: '2.5rem' },
        color: 'primary.main',
    },
    title: {
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        lineHeight: 1.2,
    },
    description: {
        fontSize: { xs: '0.9375rem', md: '1.0625rem' },
        lineHeight: 1.7,
        maxWidth: 600,
        mx: 'auto',
    },
    card: {
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
    },
    cardContent: {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        '&:last-child': {
            pb: 2,
        },
    },
    iconContainer: {
        mb: 1,
    },
    iconAvatar: {
        width: 48,
        height: 48,
    },
    cardTitle: {
        fontWeight: 600,
        mb: 0.5,
        fontSize: '1rem',
        color: 'text.primary',
    },
    cardDesc: {
        lineHeight: 1.5,
        fontSize: '0.875rem',
    },
}