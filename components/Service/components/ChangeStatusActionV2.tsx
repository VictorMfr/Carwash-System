import { useEffect, useState } from "react";
import { Autocomplete, Button, DialogActions, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";


/*
    CASO#1
    No hay transacciones relacionadas al servicio, y el servicio esta
    en estado 'Pendiente', el usuario quiere cambiar al estado de 'Completado',
    Selecciona el boton de cambiar el estado a 'Completado', el sistema
    debe pedirle obligatoriamente el metodo de pago utilizado. 

    Si el estado es 'Pendiente', significa que el servicio habia sido completado
    pero que ahora se cambio a 'Pendiente'.

    Si el estado es 'Completado', se debe habilitar el campo de metodo de pago.
    y no enviara la peticion al backend hasta que el usuario selecciones el
    metodo de pago.
*/

const STATUS_OPTIONS = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Completado', label: 'Completado' },
];

export const ChangeStatusActionIcon = () => (
    <SwapHorizIcon />
);

export default function ChangeStatusActionV2({
    handleClose,
    params,
}: {
    handleClose: () => void;
    params: GridRenderCellParams;
}) {
    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();
    const [status, setStatus] = useState<string>(params.row.status ?? 'Pendiente');
    const [saving, setSaving] = useState(false);

    const [autocompleteValue, setAutocompleteValue] = useState<any | null>(null);
    const [autocompleteOptions, setAutocompleteOptions] = useState<any[]>([]);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);

    const fetchPaymentMethods = async () => {
        try {
            uiContext.setScreenLoading(true);
            setAutocompleteLoading(true);
            const response = await api.get('/api/finance/method');
            setAutocompleteOptions(response.data);
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            uiContext.setScreenLoading(false);
            setAutocompleteLoading(false);
        }
    }


    useEffect(() => {
        if (status === 'Completado') {
            fetchPaymentMethods();
        } else {
            setAutocompleteValue(null);
        }
    }, [status]);


    const handleSubmit = async () => {
        try {

            if (status === 'Completado' && !autocompleteValue) {
                uiContext.setSnackbar({ open: true, message: 'Debes seleccionar un metodo de pago', severity: 'error' });
                return;
            }

            setSaving(true);
            const response = await api.put(`${datagridCtx.settings.url}/${params.row.id}/status`, { status, method: autocompleteValue });
            const updatedService = response.data;

            uiContext.setSnackbar({ open: true, message: 'Estado actualizado correctamente', severity: 'success' });
            datagridCtx.setFetchData(prev =>
                prev.map(item => (item.id === updatedService.id ? updatedService : item))
            );
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setSaving(false);
        }
    };

    return (
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
            <Autocomplete
                options={autocompleteOptions}
                loading={autocompleteLoading}
                value={autocompleteValue}
                onChange={(_, newValue) => setAutocompleteValue(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Método de pago" fullWidth />
                )}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disabled={status !== 'Completado'}
            />


            <DialogActions sx={{ px: 0 }}>
                <Button onClick={handleClose} disabled={saving}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" disabled={saving}>
                    Guardar
                </Button>
            </DialogActions>
        </Stack>
    );
}
