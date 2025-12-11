'use client';

import { 
    Box, 
    Button, 
    Paper, 
    Stack, 
    TextField, 
    Typography, 
    Container,
    Avatar,
    InputAdornment,
    IconButton,
    CircularProgress,
    Grid,
    Theme,
    SxProps,
    Card
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, Login as LoginIcon } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import useLoginController from "./useLoginController";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const LoginPage = () => {
    const controller = useLoginController();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={styles.container}>
            <Grid container sx={styles.gridContainer}>
                {/* Left Panel - Image */}
                <Grid size={{ xs: 0, md: 5 }} sx={styles.leftPanel}>
                    <Box sx={styles.imageContainer}>
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Sistema de gestión"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </Box>
                </Grid>

                {/* Right Panel - Form */}
                <Grid size={{ xs: 12, md: 7 }} sx={styles.rightPanel}>
                    <Container maxWidth="sm" sx={styles.containerInner}>
                        <Card variant="outlined" elevation={0} sx={styles.paper}>
                            <Stack spacing={4}>
                                {/* Logo and Title */}
                                <Stack spacing={2} alignItems="center" sx={styles.header}>
                                    <Avatar sx={styles.logo}>
                                        <LockOutlined sx={styles.logoIcon} />
                                    </Avatar>
                                    <Typography variant="h4" component="h1" sx={styles.title}>
                                        Iniciar sesión
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={styles.subtitle}>
                                        Ingresa tus credenciales para acceder al sistema
                                    </Typography>
                                </Stack>

                                {/* Form */}
                                <Stack spacing={3} sx={styles.form} component="form">
                                    <TextField
                                        value={controller.formData.email.value}
                                        onChange={(e) => controller.setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        label="Email"
                                        placeholder="tu@email.com"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!controller.formData.email.error}
                                        helperText={controller.formData.email.error}
                                        sx={styles.textField}
                                    />
                                    <TextField
                                        value={controller.formData.password.value}
                                        onChange={(e) => controller.setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!controller.formData.password.error}
                                        helperText={controller.formData.password.error}
                                        sx={styles.textField}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        onClick={controller.login}
                                        disabled={controller.formData.loading}
                                        sx={styles.loginButton}
                                        startIcon={!controller.formData.loading && <LoginIcon />}
                                    >
                                        {controller.formData.loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'Iniciar sesión'
                                        )}
                                    </Button>
                                </Stack>

                                {/* Footer Links */}
                                <Stack spacing={1} alignItems="center" sx={styles.footer}>
                                    <Link href="/passwordRecover" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" sx={styles.forgotPassword}>
                                            ¿Olvidaste tu contraseña?
                                        </Typography>
                                    </Link>
                                    <Link href="/" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body2" sx={styles.backHome}>
                                            Volver al inicio
                                        </Typography>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Card>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: "100vh",
        bgcolor: "background.default",
    },
    gridContainer: {
        minHeight: "100vh",
    },
    leftPanel: {
        display: { xs: 'none', md: 'flex' },
        position: 'relative',
        overflow: 'hidden',
        opacity: 0.8,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
    },
    rightPanel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 4 },
    },
    containerInner: {
        width: '100%',
        maxWidth: 500,
    },
    paper: {
        p: { xs: 4, sm: 5, md: 6 },
        borderRadius: 3,
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 'none',
    },
    header: {
        width: '100%',
    },
    logo: {
        width: 64,
        height: 64,
        bgcolor: 'primary.main',
        mb: 1,
    },
    logoIcon: {
        fontSize: 32,
        color: 'primary.contrastText',
    },
    title: {
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2rem' },
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: { xs: '0.875rem', md: '0.9375rem' },
    },
    form: {
        width: '100%',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        },
    },
    loginButton: {
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        mt: 1,
    },
    footer: {
        width: '100%',
        pt: 2,
    },
    forgotPassword: {
        color: 'primary.main',
        fontWeight: 500,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    backHome: {
        color: 'text.secondary',
        cursor: 'pointer',
        '&:hover': {
            color: 'primary.main',
            textDecoration: 'underline',
        },
    },
}

export default withUIDisplayControls(LoginPage);
