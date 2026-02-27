import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import ModuleAutoComplete from "../ModuleAutocomplete/ModuleAutoComplete";
import { AutocompleteModule } from "@/types/autocomplete/autocomplete";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { useContext, useState } from "react";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";
import api from "@/lib/axios";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { ModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";

const moduleSettings: AutocompleteModule = {
    url: '/api/stock/state',
    confirm: {
        title: 'Agregar estado',
        message: '¿Estás seguro de querer agregar este estado?',
        successMessage: 'Estado agregado correctamente',
    },
    label: 'Estado',
    labelField: 'name',
    newItemLabel: 'Agregar estado',
    loadingType: 'screen',
}

type LegacyProps = {
    setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void;
    actionModal: { open: boolean, action: any, data: any };
    params: GridRenderCellParams;
    setData: (data: any) => void;
};

type V2Props = {
    handleClose: () => void;
    params: GridRenderCellParams;
};

type StateModalProps = LegacyProps | V2Props;

const isV2Props = (props: StateModalProps): props is V2Props => {
    return 'handleClose' in props;
};

const StateModal = (props: StateModalProps) => {

    const v2Mode = isV2Props(props);
    const params = props.params;
    const [value, setValue] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const uiContext = useUIDisplayControls();
    const datagridCtx = useContext(ModuleDataGridContext);

    const handleClose = () => {
        if (v2Mode) {
            props.handleClose();
            return;
        }
        props.setActionModal({ open: false, action: null, data: null });
    }

    const handleSubmit = async () => {
        if (!value) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('state_id', value.id);
            await api.put(`/api/stock/${params.row.stockId}/details/${params.row.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            uiContext.setSnackbar({ open: true, message: 'Estado del producto cambiado correctamente', severity: 'success' });
            if (v2Mode) {
                await datagridCtx.refetch();
            } else {
                props.setData((prev: any) => prev.map((item: any) => item.id === params.row.id ? {
                    ...item,
                    stateId: value.id,
                    state: value.name
                } : item));
            }
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
        if (!v2Mode) {
            props.setActionModal({ open: false, action: 'add', data: value });
        }
    }

    if (v2Mode) {
        return (
            <Stack spacing={2}>
                <ModuleAutoComplete autoCompleteSettings={moduleSettings} onChange={setValue} />
                <DialogActions sx={{ px: 0 }}>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading || !value}
                    >
                        Cambiar
                    </Button>
                </DialogActions>
            </Stack>
        );
    }

    return (
        <Dialog
            open={props.actionModal.open}
            onClose={handleClose}
        >
            <DialogTitle>Estado del producto</DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingTop={1} paddingBottom={1}>
                    <ModuleAutoComplete autoCompleteSettings={moduleSettings} onChange={setValue} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading || !value}
                >
                    Cambiar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withUIDisplayControls(StateModal);