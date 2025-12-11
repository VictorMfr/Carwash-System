import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

const clamp01 = (value: string) => {
    const parsed = Number(value);
    if (isNaN(parsed)) return "0";
    return String(Math.max(0, Math.min(1, parsed)));
};

const buildLineDataset = (weightSum: number, threshold: number) => {
    const points = Array.from({ length: 11 }, (_, idx) => {
        const real = idx / 10;
        const projection = Number((real * weightSum).toFixed(3));
        return {
            real,
            projection,
            threshold,
        };
    });

    let cutIndex: number | null = null;

    if (weightSum > 0) {
        const intersectionReal = threshold / weightSum;
        if (Number.isFinite(intersectionReal) && intersectionReal >= 0 && intersectionReal <= 1) {
            const cutPoint = {
                real: Number(intersectionReal.toFixed(3)),
                projection: Number((intersectionReal * weightSum).toFixed(3)),
                threshold,
            };
            points.push(cutPoint);
            points.sort((a, b) => a.real - b.real);
            cutIndex = points.indexOf(cutPoint);
        }
    }

    return { dataset: points, cutIndex };
};

const MarketingTab = () => {
    const uiContext = useUIDisplayControls();
    const [loyaltyWeights, setLoyaltyWeights] = useState({ a: "0.33", b: "0.33", c: "0.34" });
    const [delinquencyWeights, setDelinquencyWeights] = useState({ a: "0.5", b: "0.5" });
    const [promotionMin, setPromotionMin] = useState("0.7");
    const [reminderMin, setReminderMin] = useState("0.6");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const numericValue = (value: string) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/marketing/config");
                if (!res.ok) return;
                const data = await res.json();
                const lw = data?.loyaltyWeights ?? { a: 1 / 3, b: 1 / 3, c: 1 / 3 };
                const dw = data?.delinquencyWeights ?? { a: 0.5, b: 0.5 };
                const el = data?.marketingEligibility ?? { promotionMin: 0.7, reminderMin: 0.6 };
                setLoyaltyWeights({ a: String(lw.a), b: String(lw.b), c: String(lw.c) });
                setDelinquencyWeights({ a: String(dw.a), b: String(dw.b) });
                setPromotionMin(String(el.promotionMin));
                setReminderMin(String(el.reminderMin));
            } catch (error) {
                console.warn("Marketing config fetch failed", error);
            }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const parse = (v: string) => {
                const n = Number(v);
                if (isNaN(n)) throw new Error("Valores de peso deben ser numéricos");
                return Math.max(0, Math.min(1, n));
            };
            const payload = {
                loyaltyWeights: {
                    a: parse(loyaltyWeights.a),
                    b: parse(loyaltyWeights.b),
                    c: parse(loyaltyWeights.c),
                },
                delinquencyWeights: {
                    a: parse(delinquencyWeights.a),
                    b: parse(delinquencyWeights.b),
                },
                marketingEligibility: {
                    promotionMin: parse(promotionMin),
                    reminderMin: parse(reminderMin),
                },
            };
            const res = await fetch("/api/marketing/config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Error al guardar");
            }
            uiContext.setSnackbar({
                open: true,
                message: "Configuración de marketing guardada",
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

    const fidelityDataset = useMemo(() => {
        const weightSum =
            numericValue(loyaltyWeights.a) +
            numericValue(loyaltyWeights.b) +
            numericValue(loyaltyWeights.c);
        return buildLineDataset(weightSum, numericValue(promotionMin));
    }, [loyaltyWeights, promotionMin]);

    const delinquencyDataset = useMemo(() => {
        const weightSum = numericValue(delinquencyWeights.a) + numericValue(delinquencyWeights.b);
        return buildLineDataset(weightSum, numericValue(reminderMin));
    }, [delinquencyWeights, reminderMin]);

    const renderChart = (
        title: string,
        dataset: { dataset: any[]; cutIndex: number | null },
        thresholdLabel: string,
    ) => (
        <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
                {title}
            </Typography>
            <LineChart
                height={200}
                dataset={dataset.dataset}
                xAxis={[
                    {
                        dataKey: "real",
                        valueFormatter: (value: number) => `${(value * 100).toFixed(0)}%`,
                        label: "Real",
                    },
                ]}
                series={[
                    {
                        dataKey: "projection",
                        label: "Proyección (x · pesos)",
                        showMark:
                            dataset.cutIndex == null
                                ? false
                                : ({ index }) => index === dataset.cutIndex,
                        shape: "circle",
                    },
                    {
                        dataKey: "threshold",
                        label: thresholdLabel,
                        curve: "linear",
                        showMark:
                            dataset.cutIndex == null
                                ? false
                                : ({ index }) => index === dataset.cutIndex,
                        color: "#ff7043",
                        shape: "circle",
                    },
                ]}
                yAxis={[{ min: 0, max: 1 }]}
                grid={{ horizontal: true }}
            />
        </Box>
    );

    return (
        <Box maxWidth={960} mx="auto" width="100%">
            <Stack spacing={2}>
                <Typography variant="h6">Configuración de Marketing</Typography>
                <Typography variant="body2" color="text.secondary">
                    Visualiza y ajusta los pesos de fidelidad y morosidad con sus respectivos umbrales.
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
                        <Stack spacing={3}>
                            <Stack spacing={2}>
                                <Typography variant="subtitle1">Fidelidad</Typography>
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        label="Peso a (monto)"
                                        value={loyaltyWeights.a}
                                        onChange={(e) =>
                                            setLoyaltyWeights((v) => ({ ...v, a: clamp01(e.target.value) }))
                                        }
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                    <TextField
                                        label="Peso b (# servicios)"
                                        value={loyaltyWeights.b}
                                        onChange={(e) =>
                                            setLoyaltyWeights((v) => ({ ...v, b: clamp01(e.target.value) }))
                                        }
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                    <TextField
                                        label="Peso c (recencia)"
                                        value={loyaltyWeights.c}
                                        onChange={(e) =>
                                            setLoyaltyWeights((v) => ({ ...v, c: clamp01(e.target.value) }))
                                        }
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        label="Umbral promoción (≥)"
                                        value={promotionMin}
                                        onChange={(e) => setPromotionMin(clamp01(e.target.value))}
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                <Typography variant="subtitle1">Morosidad</Typography>
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        label="Peso a (monto pendiente)"
                                        value={delinquencyWeights.a}
                                        onChange={(e) =>
                                            setDelinquencyWeights((v) => ({
                                                ...v,
                                                a: clamp01(e.target.value),
                                            }))
                                        }
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                    <TextField
                                        label="Peso b (# pendientes)"
                                        value={delinquencyWeights.b}
                                        onChange={(e) =>
                                            setDelinquencyWeights((v) => ({
                                                ...v,
                                                b: clamp01(e.target.value),
                                            }))
                                        }
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        label="Umbral recordatorio (≥)"
                                        value={reminderMin}
                                        onChange={(e) => setReminderMin(clamp01(e.target.value))}
                                        fullWidth
                                        type="number"
                                        slotProps={{ htmlInput: { step: 0.01 } }}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={saving}
                                    sx={{ minWidth: 180 }}
                                >
                                    Guardar marketing
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
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                        <Stack spacing={3}>
                            {renderChart(
                                "Fidelidad · Línea proyectada vs umbral",
                                fidelityDataset,
                                "Umbral promoción",
                            )}
                            {renderChart(
                                "Morosidad · Línea proyectada vs umbral",
                                delinquencyDataset,
                                "Umbral recordatorio",
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default MarketingTab;

