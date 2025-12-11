import { SxProps, Box, Typography, Stack, Button, Grid, Card, CardContent, Avatar, Chip, Paper, Accordion, AccordionSummary, AccordionDetails, Theme } from "@mui/material";
import backgroundImage from "@/public/imgs/logo.jpg";
import Link from "next/link";

export default function MainSection() {
    return (
        <Stack sx={styles.mainSection}>
            <Box sx={styles.contentContainer}>
                <Stack
                    spacing={3}
                    alignItems="center"
                    textAlign="center"
                >
                    <Stack spacing={1.5} alignItems="center">
                        <Avatar
                            src="/imgs/logo.jpg"
                            alt="LA MANO DE DIOS"
                            sx={styles.logo}
                        />
                        <Chip
                            label="Software para Autolavados"
                            color="default"
                            sx={styles.chip}
                        />
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={styles.title}>
                            LA MANO DE DIOS
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={styles.description}
                        >
                            Gestiona agenda, servicios, clientes, inventario y finanzas con una plataforma rápida y moderna.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Link href="/login" style={{ textDecoration: 'none' }}>
                            <Button size="medium" variant="contained" color="primary">Iniciar</Button>
                        </Link>
                        <Link href="/docs" style={{ textDecoration: 'none' }}>
                            <Button size="medium" variant="outlined" sx={styles.button}>Ver documentación</Button>
                        </Link>
                    </Stack>

                    <Grid
                        container
                        spacing={2}
                        sx={styles.grid}
                    >
                        <Grid size={4}>
                            <Stack
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography variant="h6" sx={styles.gridItemTitle}>+30%</Typography>
                                <Typography variant="caption" sx={styles.gridItemDescription}>Más turnos completados</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={4}>
                            <Stack spacing={0.5} alignItems="center">
                                <Typography variant="h6" sx={styles.gridItemTitle}>-40%</Typography>
                                <Typography variant="caption" sx={styles.gridItemDescription}>Menos tiempo administrativo</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={4}>
                            <Stack spacing={0.5} alignItems="center">
                                <Typography variant="h6" sx={styles.gridItemTitle}>100%</Typography>
                                <Typography variant="caption" sx={styles.gridItemDescription}>Control de inventario</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </Stack>
    )
}


const styles: Record<string, SxProps<Theme>> = {
    mainSection: {
        position: 'relative',
        color: 'primary.contrastText',
        overflow: 'hidden',
        minHeight: 'auto',
        backgroundColor: '#00293D',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 3, md: 4 },
        py: { xs: 4, md: 5 }    
    },
    contentContainer: {
        position: 'relative',
        maxWidth: 1200,
        mx: 'auto',
        px: 2,
        zIndex: 3
    },
    chip: {
        bgcolor: 'rgba(255,255,255,0.16)',
        color: 'primary.contrastText',
        border: '1px solid rgba(255,255,255,0.24)'
    },
    title: {
        fontSize: { xs: 24, md: 28 },
        fontWeight: { xs: 700, md: 800 }
    },
    description: {
        maxWidth: 560,
        opacity: 0.9,
        fontSize: { xs: '1rem', md: '1.125rem' }
    },
    button: {
        color: 'primary.contrastText',
        borderColor: 'primary.contrastText',
        '&:hover': {
            borderColor: 'primary.contrastText',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    grid: {
        mt: 1
    },
    gridItem: {
        spacing: 0.5,
        alignItems: 'center'
    },
    gridItemTitle: {
        fontWeight: 700
    },
    gridItemDescription: {
        opacity: 0.9
    },
    logo: {
        width: { xs: 150, sm: 200, md: 250 },
        height: { xs: 90, sm: 120, md: 150 }
    }
}
