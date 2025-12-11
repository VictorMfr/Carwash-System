import { useState } from "react";
import { DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Stack, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useModuleDataGridContext } from "@/components/ModuleDataGrid/context";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

const STATUS_OPTIONS = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Completado', label: 'Completado' },
];

export const ChangeStatusActionIcon = () => (
    <SwapHorizIcon />
);

interface ChangeStatusModalProps {
    setActionModal: (actionModal: { open: boolean; action: any }) => void;
    params: GridRenderCellParams;
    actionModal?: { open: boolean; action: any };
}

export const ChangeStatusActionModal = ({ setActionModal, params }: ChangeStatusModalProps) => {
    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();
    const [status, setStatus] = useState<string>(params.row.status ?? 'Pendiente');
    const [saving, setSaving] = useState(false);

    const handleClose = () => setActionModal({ open: false, action: null });

    const handleSubmit = async () => {
        try {
            setSaving(true);
            const response = await api.put(`${datagridCtx.moduleSettings.url}/${params.row.id}`, { status });
            const updatedService = response.data;

            datagridCtx.setFetchData(prev =>
                prev.map(item => (item.id === updatedService.id ? updatedService : item))
            );

            uiContext.setSnackbar({ open: true, message: 'Estado actualizado correctamente', severity: 'success' });
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <DialogTitle>Cambiar estado</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Typography variant="body2">
                        Selecciona el estado al que deseas cambiar este servicio.
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        label="Estado"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        {STATUS_OPTIONS.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={saving}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" disabled={saving}>
                    Guardar
                </Button>
            </DialogActions>
        </>
    );
};

