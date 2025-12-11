import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";

type AccountOption = {
    id: number;
    name: string;
    description: string;
};

const FinanceTab = () => {
    const uiContext = useUIDisplayControls();
    const [accounts, setAccounts] = useState<AccountOption[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setFetching(true);
        try {
            const [accountsRes, configRes] = await Promise.all([
                fetch("/api/finance/account"),
                fetch("/api/finance/config"),
            ]);

            if (accountsRes.ok) {
                const data = await accountsRes.json();
                setAccounts(data);
            }

            if (configRes.ok) {
                const config = await configRes.json();
                if (config.financeAccountId) {
                    setSelectedAccountId(String(config.financeAccountId));
                }
            }
        } catch (error) {
            console.warn("No se pudieron cargar las cuentas de finanzas", error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedAccountId(event.target.value);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                financeAccountId: selectedAccountId ? Number(selectedAccountId) : null,
            };
            const res = await fetch("/api/finance/config", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Error al guardar configuración financiera");
            }
            uiContext.setSnackbar({
                open: true,
                message: "Cuenta financiera configurada correctamente",
                severity: "success",
            });
        } catch (error: any) {
            if (error?.response) {
                handleApiError(error, uiContext);
            } else {
                setError(error?.message ?? "Error al guardar");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth={720} mx="auto" width="100%">
            <Stack spacing={2}>
                <Typography variant="h6">Finanzas</Typography>
                <Typography variant="body2" color="text.secondary">
                    Selecciona la cuenta desde la cual se descontarán los pagos automáticos a operadores.
                </Typography>

                <FormControl fullWidth>
                    <InputLabel id="finance-account-label">Cuenta</InputLabel>
                    <Select
                        labelId="finance-account-label"
                        label="Cuenta"
                        value={selectedAccountId}
                        onChange={handleChange}
                        disabled={fetching || accounts.length === 0}
                    >
                        {accounts.map((account) => (
                            <MenuItem value={String(account.id)} key={account.id}>
                                <Stack>
                                    <Typography variant="body2" fontWeight={600}>
                                        {account.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {account.description}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {accounts.length === 0 && !fetching && (
                    <Alert severity="info">
                        No se encontraron cuentas. Crea una cuenta en el módulo de finanzas para poder asignarla.
                    </Alert>
                )}

                <Stack direction="row" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading || accounts.length === 0}
                        sx={{ minWidth: 180 }}
                    >
                        Guardar finanzas
                    </Button>
                </Stack>

                {error && (
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, display: "block", textAlign: "right" }}
                    >
                        {error}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default FinanceTab;

