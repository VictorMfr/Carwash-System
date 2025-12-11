import { 
    Box, 
    Container, 
    Typography, 
    Theme,
    SxProps
} from "@mui/material";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box sx={styles.footer}>
            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.copyrightContainer}>
                    <Typography variant="body2" sx={styles.copyright}>
                        © {currentYear} LA MANO DE DIOS — Sistema de Gestión de Autolavado. Todos los derechos reservados.
                    </Typography>
                    <Typography variant="body2" sx={styles.copyright}>
                        Desarrollado por: Victor Martinez
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    footer: {
        bgcolor: '#00293D',
        color: '#ffffff',
        py: { xs: 5, md: 6 },
    },
    container: {
        px: 2,
    },
    copyrightContainer: {
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    copyright: {
        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
        color: '#ffffff',
        opacity: 0.8,
        textAlign: 'center',
    },
}
