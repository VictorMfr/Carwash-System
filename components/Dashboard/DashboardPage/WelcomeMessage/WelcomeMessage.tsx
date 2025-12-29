import { Grid, Stack, Theme, SxProps, Typography } from "@mui/material";

export default function WelcomeMessage() {
    return (
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
    )
}

const styles: Record<string, SxProps<Theme>> = {
    welcomeTitle: {
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2rem' },
        lineHeight: 1.2,
    },
    welcomeSubtitle: {
        fontSize: { xs: '0.9375rem', md: '1rem' },
        lineHeight: 1.5,
    },
}