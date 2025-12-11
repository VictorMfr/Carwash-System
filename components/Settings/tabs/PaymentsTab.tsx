import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

const PaymentsTab = () => {
    const uiContext = useUIDisplayControls();
    const [percentage, setPercentage] = useState<string>("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/service/payments/config");
                const data = await res.json();
                const value = Number(data.operatorPaymentPercentage ?? 0.3);
                setPercentage(String(Math.round(value * 100)));
            } catch (e) {
                setPercentage("30");
            }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const numeric = Number(percentage);
            if (isNaN(numeric)) {
                setError("El valor debe ser numérico");
                setSaving(false);
                return;
            }
            const fraction = Math.max(0, Math.min(100, numeric)) / 100;
            const res = await fetch("/api/service/payments/config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ operatorPaymentPercentage: fraction }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Error al guardar");
            }
            uiContext.setSnackbar({
                open: true,
                message: "Configuración de pagos guardada",
                severity: "success",
            });
        } catch (e: any) {
            if (e?.response) {
                handleApiError(e, uiContext);
            } else {
                setError(e?.message ?? "Error al guardar");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box maxWidth={720} mx="auto" width="100%">
            <Stack spacing={2}>
                <Typography variant="h6">Configuración de pagos a operadores</Typography>
                <Typography variant="body2" color="text.secondary">
                    Define el porcentaje del pago para operadores (por defecto 30%).
                </Typography>
                <Stack spacing={2} alignItems="end">
                    <TextField
                        label="Porcentaje de pago (%)"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={saving}
                        sx={{ minWidth: 140 }}
                    >
                        Guardar
                    </Button>
                </Stack>
                {error && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                        {error}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default PaymentsTab;

