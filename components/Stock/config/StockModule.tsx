import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { Inventory } from "@mui/icons-material";
import { ProductSchema } from "@/lib/definitions";
import DetailsLink from "../DetailsLink";
import { StockSchema } from "@/lib/definitions";

const StockModule: ModuleFormGridData = {
    url: '/api/stock',
    label: 'Inventario',
    description: 'Aquí puedes ver el inventario de tus productos.',
    icon: Inventory,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'product',
                headerName: 'Producto',
                inputConfig: {
                    size: 12,
                    id: 'product',
                    autocomplete: {
                        config: {
                            validation: ProductSchema,
                            create: {
                                name: 'Agregar producto',
                                description: 'Ingresa los datos del producto',
                            }
                        },
                        url: '/api/stock/product?withoutInventory=true',
                        // Pedir solo productos sin inventario asignado
                        queryParams: { withoutInventory: true },
                        label: 'Producto',
                        labelField: 'name',
                        newItemLabel: 'Agregar producto',
                        loadingType: 'screen',
                        formData: {
                            createFillField: 'name',
                            columns: {
                                config: {
                                    gridSpacing: 2
                                },
                                data: [
                                    {
                                        field: 'name',
                                        headerName: 'Nombre',
                                        inputConfig: {
                                            size: 12,
                                            id: 'name'
                                        }
                                    },
                                    {
                                        field: 'isTool',
                                        headerName: 'Es herramienta',
                                        inputConfig: {
                                            size: 12,
                                            id: 'isTool',
                                            switch: {
                                                label: 'Es herramienta',
                                                disableIds: [{
                                                    id: 'unit',
                                                    value: 'u'
                                                }]
                                            }
                                        }
                                    },
                                    {
                                        field: 'unit',
                                        headerName: 'Unidad',
                                        inputConfig: {
                                            size: 12,
                                            id: 'unit',
                                            select: {
                                                label: 'Unidad',
                                                options: [
                                                    'kg',
                                                    'gr',
                                                    'lt',
                                                    'ml',
                                                    'u',
                                                ]
                                            }

                                        }
                                    },
                                ]
                            }
                        }
                    }
                },
            },
            {
                field: 'minimum_quantity',
                headerName: 'Cantidad Mínima',
                inputConfig: {
                    size: 12,
                    number: {},
                    id: 'minimum_quantity'
                }
            },
            {
                field: 'total',
                headerName: 'Cantidad Total',
                width: 140,
                
                inputConfig: {
                    size: 12,
                    id: 'total',
                    hideIfUpdate: true,
                    createHidden: true,
                }
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [
            {
                name: 'Ver Detalles',
                icon: DetailsLink,
                dispatchMode: 'link',
            }
        ]
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear inventario',
            description: 'Crear inventario',
            hiddenAction: true,
            validation: StockSchema
        },
        edit: {
            name: 'Editar inventario',
            description: 'Editar inventario',
        },
        delete: {
            hiddenAction: true
        }
    }
}

export default StockModule;