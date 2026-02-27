import getDollarRate from "@/lib/dollar";
import { FinanceSchema } from "@/lib/definitions";
import { MethodSchema } from "@/lib/definitions";
import { AccountSchema } from "@/lib/definitions";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { Money } from "@mui/icons-material";

const dollarRate = await getDollarRate();

const FinanceModule: ModuleFormGridData = {
    url: '/api/finance',
    label: 'Transacciones',
    description: 'Aquí puedes ver las transacciones de tu empresa.',
    icon: Money,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'date',
                headerName: 'Fecha',
                inputConfig: {
                    size: 12,
                    id: 'date',
                    date: {}
                },
            },
            {
                field: 'amount',
                headerName: 'Monto',
                inputConfig: {
                    size: 12,
                    id: 'amount',
                    number: {
                        adornment: () => <>Bs</>,
                        adornmentPosition: 'start'
                    }
                },
            },
            {
                field: 'description',
                headerName: 'Descripción',
                inputConfig: {
                    size: 12,
                    id: 'description'
                },
            },
            {
                field: 'auto',
                headerName: 'Tasa BCV',
                inputConfig: {
                    id: 'auto',
                    size: 12,
                    dataGridHidden: true,
                    switch: {
                        label: 'Auto',
                        disableIds: [
                            {
                                id: 'dollar_rate',
                                value: dollarRate[0].promedio
                            }
                        ]
                    }
                }
            },
            {
                field: 'dollar_rate',
                headerName: 'Tasa de dolar',
                inputConfig: {
                    size: 12,
                    id: 'dollar_rate',
                    number: {
                        adornment: () => <>Bs/$</>,
                        adornmentPosition: 'start'
                    }
                },
            },
            {
                field: 'account',
                headerName: 'Cuenta',
                inputConfig: {
                    size: 12,
                    id: 'account',
                    autocomplete: {
                        url: '/api/finance/account',
                        label: 'Cuenta',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar cuenta',
                        labelField: 'name',
                        config: {
                            create: {
                                name: 'Agregar cuenta',
                                description: 'Agregar cuenta',
                            },
                            validation: AccountSchema
                        },
                        formData: {
                            createFillField: 'name',
                            columns: {
                                data: [
                                    {
                                        field: 'name',
                                        headerName: 'Nombre',
                                        inputConfig: {
                                            size: 12,
                                            id: 'name',
                                        }
                                    },
                                    {
                                        field: 'description',
                                        headerName: 'Descripción',
                                        inputConfig: {
                                            size: 12,
                                            id: 'description'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            },
            {
                field: 'method',
                headerName: 'Método',
                inputConfig: {
                    size: 12,
                    id: 'method',
                    autocomplete: {
                        url: '/api/finance/method',
                        label: 'Método',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar método',
                        labelField: 'name',
                        config: {
                            validation: MethodSchema
                        },
                        confirm: {
                            title: 'Agregar método',
                            message: '¿Estás seguro de querer agregar este método?',
                            successMessage: 'Método agregado correctamente',
                        }
                    }
                },
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: []
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'export', 'export', 'filter']
        },
        create: {
            name: 'Registrar transacción',
            description: 'Registrar transacción',
            validation: FinanceSchema
        },
    }
}

export default FinanceModule;