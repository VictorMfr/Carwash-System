import { 
    Box, 
    Typography, 
    Stack, 
    Button, 
    Grid, 
    Paper, 
    Avatar,
    Container,
    Theme,
    SxProps,
    alpha,
    useTheme
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";

export default function ShowCase() {
    const theme = useTheme();
    
    return (
        <Box sx={styles.section}>
            <Container maxWidth="lg" sx={styles.container}>
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography 
                                    variant="h4" 
                                    component="h2"
                                    sx={styles.title}
                                >
                                    Panel rápido y moderno
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    color="text.secondary"
                                    sx={styles.description}
                                >
                                    Visualiza el estado del día, servicios activos, ventas y alertas de inventario. Diseñado para velocidad y claridad.
                                </Typography>
                            </Box>
                            
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={2}
                                sx={styles.buttonContainer}
                            >
                                <Link href="/login" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        variant="contained" 
                                        size="large"
                                        startIcon={<SpeedIcon />}
                                        sx={styles.primaryButton}
                                    >
                                        Comenzar ahora
                                    </Button>
                                </Link>
                                <Link href="/login" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        variant="outlined" 
                                        size="large"
                                        sx={styles.secondaryButton}
                                    >
                                        Explorar
                                    </Button>
                                </Link>
                            </Stack>
                            
                            <Stack direction="row" spacing={3} sx={styles.features}>
                                <Box sx={styles.featureItem}>
                                    <DashboardIcon sx={{ fontSize: 28, color: 'primary.main', mb: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary">
                                        Vista en tiempo real
                                    </Typography>
                                </Box>
                                <Box sx={styles.featureItem}>
                                    <SpeedIcon sx={{ fontSize: 28, color: 'primary.main', mb: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary">
                                        Respuesta rápida
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={styles.imageContainer}>
                            <Paper 
                                elevation={3}
                                sx={styles.paper}
                            >
                                <Box sx={styles.imageWrapper}>
                                    <Avatar
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                        alt="Panel de control del sistema"
                                        variant="rounded"
                                        sx={styles.image}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    section: {
        bgcolor: 'background.paper',
        py: { xs: 5, md: 7 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        }
    },
    container: {
        position: 'relative',
        zIndex: 1,
    },
    title: {
        fontWeight: 700,
        mb: 2,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        lineHeight: 1.2,
    },
    description: {
        fontSize: { xs: '0.9375rem', md: '1.0625rem' },
        lineHeight: 1.7,
        maxWidth: 500,
    },
    buttonContainer: {
        mt: 1,
    },
    primaryButton: {
        px: 3,
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
    },
    secondaryButton: {
        px: 3,
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
    },
    features: {
        mt: 2,
    },
    featureItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
    },
    paper: {
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: { xs: 240, sm: 300, md: 360 },
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}
