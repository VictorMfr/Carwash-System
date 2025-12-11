'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

const steps = ['Ingresar', 'Verificar', 'Crear nueva contraseña'];

export default function usePasswordRecoverController() {
    const router = useRouter();
    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const handleNext = () => {
        setError('');
        setSuccess('');

        if (activeStep === 0) {
            // Validar email
            if (!email || !email.includes('@')) {
                setError('Por favor, ingresa un correo electrónico válido');
                return;
            }
            handleSendVerificationCode();
        } else if (activeStep === 1) {
            // Validar código de verificación
            if (!verificationCode || verificationCode.length !== 6) {
                setError('Por favor, ingresa el código de verificación de 6 dígitos');
                return;
            }
            handleVerifyCode();
        } else if (activeStep === 2) {
            // Validar nueva contraseña
            if (!newPassword || newPassword.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (newPassword !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
            handleResetPassword();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setError('');
        setSuccess('');
    };

    const handleReset = () => {
        router.push('/login');
    };

    const handleSendVerificationCode = async () => {
        setLoading(true);
        try {
            const response = await api.post('/api/auth/send-recovery-code', { email });
            const data = response.data;

            if (response.status === 200) {
                setSuccess(data.message);
                setActiveStep(1);
            } else {
                setError(data.error || 'Error al enviar el código de verificación');
            }
        } catch (error) {
            setError('Error al enviar el código de verificación. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setLoading(true);
        try {
            const response = await api.post('/api/auth/verify-recovery-code', { email, code: verificationCode });
            const data = response.data;

            if (response.status === 200) {
                setSuccess(data.message);
                setActiveStep(2);
            } else {
                setError(data.error || 'Código de verificación inválido');
            }
        } catch (error) {
            setError('Error al verificar el código. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            const response = await api.post('/api/auth/reset-password', { email, newPassword });
            const data = response.data;

            if (response.status === 200) {
                setSuccess(data.message);
                setActiveStep(3);
            } else {
                setError(data.error || 'Error al restablecer la contraseña');
            }
        } catch (error) {
            setError('Error al restablecer la contraseña. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return {
        // State
        activeStep,
        email,
        verificationCode,
        newPassword,
        confirmPassword,
        loading,
        error,
        success,
        steps,

        // Setters
        setEmail,
        setVerificationCode,
        setNewPassword,
        setConfirmPassword,

        // Handlers
        handleNext,
        handleBack,
        handleReset,
        handleSendVerificationCode,
        handleVerifyCode,
        handleResetPassword,
    };
}