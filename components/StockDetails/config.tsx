import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import PictureCell from "../ModuleDataGrid/PictureCell";
import { AccountSchema } from "@/lib/definitions";
import { stepThreeDataCharge } from "../Service/config_/ServiceModule";
import { Fragment } from "react";
import getDollarRate from "@/lib/dollar";
import AccountFormData from "../Account/config";

const dollarRate = await getDollarRate();

export const stockDetailsStepsData = [
    {
        title: 'Llena los campos',
        description: 'Llena los campos para agregar un nuevo stock',
        label: 'Datos del stock',
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'quantity',
                headerName: 'Cantidad',
                inputConfig: {
                    size: 6,
                    id: 'quantity',
                    number: {}
                },
                width: 100,
            },
            
            {
                field: 'entry_date',
                headerName: 'Fecha de entrada',
                inputConfig: {
                    size: 6,
                    id: 'entry_date',
                    date: {}
                },
                width: 150,
            },
            {
                field: 'brand',
                headerName: 'Marca',
                inputConfig: {
                    size: 6,
                    id: 'brand',
                    autocomplete: {
                        url: '/api/stock/brand',
                        label: 'Marca',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar marca',
                        confirm: {
                            title: 'Agregar marca',
                            message: '¿Estás seguro de querer agregar esta marca?',
                            successMessage: 'Marca agregada correctamente',
                        },
                        labelField: 'name',

                    }
                },
            },
            {
                field: 'state',
                headerName: 'Estado',
                inputConfig: {
                    size: 6,
                    id: 'state',
                    autocomplete: {
                        url: '/api/stock/state',
                        label: 'Estado',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar estado',
                        confirm: {
                            title: 'Agregar estado',
                            message: '¿Estás seguro de querer agregar este estado?',
                            successMessage: 'Estado agregado correctamente',
                        },
                        labelField: 'name',
                    }
                },
            }
        ]
    },
    {
        label: 'Datos financieros',
        title: 'Datos financieros',
        description: 'Datos financieros del stock',
        config: {},
        data: [
            
            {
                field: 'charge_switch',
                headerName: 'Monto en dolares',
                inputConfig: {
                    size: 6,
                    id: 'charge_switch',
                    switch: {
                        label: 'Monto en dolares',
                        swapIds: [
                            {
                                id: 'bol_charge',
                                value: {
                                    field: 'dollar_charge',
                                    headerName: 'Monto en dolares',
                                    inputConfig: {
                                        size: 12,
                                        id: 'dollar_charge',
                                        number: { adornment: () => <>$</>, adornmentPosition: 'start' }
                                    },
                                }
                            }
                        ]
                    }
                },
                renderCell: (params: any) => (
                    <Fragment>
                        {params.row.dollar_charge !== null && params.row.dollar_charge !== undefined
                            ? Number(params.row.dollar_charge).toFixed(2)
                            : ''}
                    </Fragment>
                )
            },
            {
                field: 'rate_switch',
                headerName: 'Tasa de cambio BCV',
                inputConfig: {
                    dataGridHidden: true,
                    size: 6,
                    id: 'rate_switch',
                    switch: { label: 'Tasa de cambio BCV', disableIds: [{ id: 'dollar_rate', value: dollarRate[0].promedio }] }
                }
            },
            {
                field: 'bol_charge',
                headerName: 'Monto en bolívares',
                inputConfig: { size: 6, id: 'bol_charge', number: { adornment: () => <>Bs</>, adornmentPosition: 'start' } }
            },
            
            {
                field: 'dollar_rate',
                headerName: 'Tasa de cambio',
                inputConfig: { size: 6, id: 'dollar_rate', number: { adornment: () => <>Bs/$</>, adornmentPosition: 'start' } }
            },
            {
                field: 'charge_account',
                headerName: 'Cuenta a cobrar',
                inputConfig: {
                    size: 6,
                    id: 'charge_account',
                    autocomplete: {
                        url: '/api/finance/account',
                        label: 'Cuenta a cobrar',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar cuenta a cobrar',
                        labelField: 'name',
                        config: {
                            create: {
                                description: 'Agregar cuenta a cobrar',
                                name: 'Agregar cuenta a cobrar',
                            }
                        },
                        formData: {
                            createFillField: 'name',
                            columns: {
                                
                                data: AccountFormData.columns
                            }
                        }
                    }
                },
            },
            {
                field: 'method',
                headerName: 'Método de pago',
                inputConfig: {
                    size: 6,
                    id: 'method',
                    autocomplete: {
                        url: '/api/finance/method',
                        label: 'Método de pago',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar método de pago',
                        labelField: 'name',
                        config: {
                            create: {
                                description: 'Agregar método de pago',
                                name: 'Agregar cuenta a cobrar',
                            }
                        },
                        confirm: {
                            title: 'Agregar método de pago',
                            message: '¿Estás seguro de querer agregar este método de pago?',
                            successMessage: 'Método de pago agregado correctamente',
                        }
                    }
                },
            },
        ]
    },
    {
        title: 'Agrega una imagen',
        description: 'Agrega una imagen al stock',
        label: 'Agrega una imagen',
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'picture',
                headerName: 'Imagen',
                inputConfig: {
                    size: 12,
                    id: 'picture',
                    picture: {},
                },
                width: 150,
                renderCell: PictureCell
            }
        ]
    }
]

const StockDetailsSettings: ModuleFormGridData = {
    url: '/api/stock/details',
    columns: {
        contentType: 'multipart/form-data',
        config: {
            gridSpacing: 2
        },
        stepper: {
            orientation: 'horizontal',
            steps: stockDetailsStepsData as any
        }
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
        rowHeight: 100,
        create: {
            contentType: 'multipart/form-data'
        },
        edit: {
            contentType: 'multipart/form-data'
        },
        delete: {
            hiddenAction: false
        },
        toolbar: {
            show: ['quickFilter', 'export', 'export', 'filter', 'create']
        }
    }
}

export default StockDetailsSettings;