import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { Payment } from "@mui/icons-material";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

type PaymentActionArgs = {
    uiContext: any;
    datagridCtx: any;
    params?: any;
};

const confirmPayment = ({
    uiContext,
    operatorIds,
    message,
}: {
    uiContext: any;
    operatorIds: number[];
    message: string;
}) => {
    if (!operatorIds.length) {
        uiContext.setSnackbar({
            open: true,
            message: "No hay operadores para pagar",
            severity: "info",
        });
        return;
    }

    uiContext.setAlert({
        open: true,
        title: "Confirmar pago",
        message,
        severity: "info",
        actions: [
            {
                label: "Cancelar",
                onClick: () => uiContext.setAlert((prev: any) => ({ ...prev, open: false })),
            },
            {
                label: "Pagar",
                onClick: async () => {
                    try {
                        uiContext.setLoading(true);
                        await api.post("/api/service/payments", { operatorIds });
                        uiContext.setAlert((prev: any) => ({ ...prev, open: false }));
                        uiContext.setSnackbar({
                            open: true,
                            message: "Pago registrado correctamente",
                            severity: "success",
                        });
                    } catch (error) {
                        handleApiError(error, uiContext);
                    } finally {
                        uiContext.setLoading(false);
                    }
                },
            },
        ],
    });
};

const handlePaySingle = ({ uiContext, params }: PaymentActionArgs) => {
    if (!params?.row) return;
    const operatorId = Number(params.row.id);
    const operatorName = params.row.operator;
    const amount = params.row.payment;
    confirmPayment({
        uiContext,
        operatorIds: [operatorId],
        message: `¿Deseas pagar Bs ${amount} a ${operatorName}?`,
    });
};

const handlePayAll = ({ uiContext, datagridCtx }: PaymentActionArgs) => {
    const allIds = (datagridCtx.fetchData ?? [])
        .map((row: any) => Number(row.id))
        .filter((id: number) => !Number.isNaN(id));
    if (!allIds.length) {
        uiContext.setSnackbar({
            open: true,
            message: "No hay operadores para pagar",
            severity: "info",
        });
        return;
    }
    confirmPayment({
        uiContext,
        operatorIds: allIds,
        message: `Se registrará el pago para ${allIds.length} operadores. ¿Deseas continuar?`,
    });
};

const PaymentModule: ModuleFormGridData = {
    url: '/api/service/payments',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'operator',
                headerName: 'Operador',
                inputConfig: { size: 12, id: 'operator', date: {} },
                flex: 1
            },
            {
                field: 'payment',
                headerName: 'Pago',
                inputConfig: { size: 12, id: 'payment', number: { adornment: () => <>Bs</>, adornmentPosition: 'start' } },
                flex: 1
            }
        ],
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [{
            name: 'Pagar',
            icon: Payment,
            dispatchMode: 'link',
            onClick: handlePaySingle as any
        }]
    },
    config: {
        toolbar: {
            data: [
                {
                    name: 'Pagar a todos',
                    icon: Payment,
                    onClick: handlePayAll as any
                }
            ]
        }
    },
}

export default PaymentModule;