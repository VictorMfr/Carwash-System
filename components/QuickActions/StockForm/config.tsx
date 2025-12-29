import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import PictureCell from "@/components/ModuleDataGrid/PictureCell";
import { AccountSchema } from "@/lib/definitions";
import { stepThreeDataCharge } from "@/components/Service/config/ServiceModule";
import { Fragment } from "react";
import getDollarRate from "@/lib/dollar";
import { AccountFormData } from "@/components/Account/config";
import { z } from "zod";

const dollarRate = await getDollarRate();

const numberFromAny = (val: unknown) => {
    if (val === null || val === undefined || val === "") return undefined;
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
};

const stepOneValidation = z.object({
    stock: z.any().refine((v) => !!v, { message: "El inventario es requerido" }),
    quantity: z.preprocess(
        numberFromAny,
        z.number().positive("La cantidad debe ser mayor a 0")
    ),
    entry_date: z.any().refine((v) => !!v, { message: "La fecha de entrada es requerida" }),
    brand: z.any().refine((v) => !!v, { message: "La marca es requerida" }),
    state: z.any().refine((v) => !!v, { message: "El estado es requerido" }),
});

const financialValidation = z.object({
    bol_charge: z.preprocess(numberFromAny, z.number().nonnegative().optional()),
    dollar_charge: z.preprocess(numberFromAny, z.number().nonnegative().optional()),
    dollar_rate: z.preprocess(numberFromAny, z.number().nonnegative().optional()),
    charge_account: z.any().optional(),
    method: z.any().optional(),
}).superRefine((val, ctx) => {
    const hasBol = typeof val.bol_charge === "number" && Number.isFinite(val.bol_charge);
    const hasDollar = typeof val.dollar_charge === "number" && Number.isFinite(val.dollar_charge);
    if (hasBol || hasDollar) {
        if (!val.charge_account) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La cuenta a cobrar es requerida" });
        }
        if (!val.method) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El método de pago es requerido" });
        }
        if (hasDollar && !(typeof val.dollar_rate === "number" && Number.isFinite(val.dollar_rate))) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La tasa de cambio es requerida" });
        }
    }
});

const pictureValidation = z.object({
    picture: z.custom<File>((v) => v instanceof File, { message: "La imagen es requerida" }),
});

const stockQuickValidation = stepOneValidation
    .and(financialValidation)
    .and(pictureValidation);

export const stockQuickStepsData = [
    {
        title: 'Llena los campos',
        description: 'Llena los campos para agregar un nuevo stock',
        label: 'Datos del stock',
        config: {
            gridSpacing: 2,
        },
        validation: stepOneValidation,
        data: [
            {
                field: 'stock',
                headerName: 'Inventario',
                inputConfig: {
                    size: 12,
                    id: 'stock',
                    autocomplete: {
                        url: '/api/stock',
                        label: 'Inventario',
                        loadingType: 'screen',
                        labelField: 'product',
                    }
                },
                width: 200,
            },
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
        validation: financialValidation,
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

                                data: AccountFormData.data
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
        validation: pictureValidation,
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

const StockQuickFormSettings: ModuleFormGridData = {
    url: '/api/stock/details',
    columns: {
        contentType: 'multipart/form-data',
        config: {
            gridSpacing: 2
        },
        stepper: {
            orientation: 'vertical',
            steps: stockQuickStepsData as any
        }
    },
    config: {
        rowHeight: 100,
        create: {
            contentType: 'multipart/form-data',
            validation: stockQuickValidation
        },
        edit: {
            contentType: 'multipart/form-data',
            validation: stockQuickValidation
        },
        delete: {
            hiddenAction: false
        },
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        }
    }
}

export default StockQuickFormSettings;

