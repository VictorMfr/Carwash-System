'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import usePasswordRecoverController from './usePasswordRecoverController';

export default function PasswordRecover() {
  const controller = usePasswordRecoverController();

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon color="primary" />
              <Typography variant="h6">Ingresa tu correo electrónico</Typography>
            </Box>
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              value={controller.email}
              onChange={(e) => controller.setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico registrado"
              required
            />
            <Typography variant="body2" color="text.secondary">
              Te enviaremos un código de verificación a este correo electrónico.
            </Typography>
          </Stack>
        );
      
      case 1:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LockIcon color="primary" />
              <Typography variant="h6">Ingresa el código de verificación</Typography>
            </Box>
            <TextField
              fullWidth
              label="Código de verificación"
              value={controller.verificationCode}
              onChange={(e) => controller.setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Ingresa el código de verificación de 6 dígitos"
              inputProps={{ maxLength: 6 }}
              required
            />
            <Typography variant="body2" color="text.secondary">
              Revisa tu correo electrónico para el código de verificación de 6 dígitos.
            </Typography>
          </Stack>
        );
      
      case 2:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LockIcon color="primary" />
              <Typography variant="h6">Crea una nueva contraseña</Typography>
            </Box>
            <TextField
              fullWidth
              label="Nueva contraseña"
              type="password"
              value={controller.newPassword}
              onChange={(e) => controller.setNewPassword(e.target.value)}
              placeholder="Ingresa una nueva contraseña"
              required
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type="password"
              value={controller.confirmPassword}
              onChange={(e) => controller.setConfirmPassword(e.target.value)}
              placeholder="Confirma la nueva contraseña"
              required
            />
            <Typography variant="body2" color="text.secondary">
              La contraseña debe tener al menos 6 caracteres.
            </Typography>
          </Stack>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Recuperación de contraseña
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Sigue los pasos a continuación para recuperar tu contraseña
          </Typography>

          <Stepper activeStep={controller.activeStep} sx={{ mb: 4 }}>
            {controller.steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {controller.activeStep === controller.steps.length ? (
            <React.Fragment>
              <Box textAlign="center" py={4}>
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Contraseña restablecida completamente!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Tu contraseña ha sido restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={controller.handleReset}
                  size="large"
                >
                  Volver a empezar
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {controller.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {controller.error}
                </Alert>
              )}
              
              {controller.success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {controller.success}
                </Alert>
              )}

              <Box sx={{ mb: 4 }}>
                {renderStepContent(controller.activeStep)}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={controller.activeStep === 0}
                  onClick={controller.handleBack}
                  sx={{ mr: 1 }}
                >
                  Atras
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button 
                  onClick={controller.handleNext}
                  disabled={controller.loading}
                  variant="contained"
                >
                  {controller.loading ? 'Procesando...' : controller.activeStep === controller.steps.length - 1 ? 'Restablecer contraseña' : 'Siguiente'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}