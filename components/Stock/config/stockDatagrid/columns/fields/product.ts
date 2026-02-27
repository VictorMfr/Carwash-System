import columns from "@/types/v2/datagrid/columns/columns";
import { ProductObjectSchema } from "@/lib/definitions";

export const product: columns = {
    id: 'product',
    field: 'product',
    headerName: 'Producto',
    size: 12,
    flex: 1,
    autocomplete: {
        url: '/api/stock/product?withoutInventory=true',
        searchField: 'name',
        queryParams: { withoutInventory: true },
        newItemLabel: 'Agregar producto',
        config: {
            create: {
                name: 'Agregar producto',
                description: 'Ingresa los datos del producto',
            },
        },
        formData: {
            validation: ProductObjectSchema,
            createFillField: 'name',
            columns: {
                config: {
                    spacing: 2,
                },
                contentType: 'application/json',
                fields: [
                    {
                        id: 'name',
                        field: 'name',
                        headerName: 'Nombre',
                        size: 12,
                    },
                    {
                        id: 'isTool',
                        field: 'isTool',
                        headerName: 'Es herramienta',
                        size: 12,
                        switch: {
                            disableIds: [
                                { id: 'unit', value: 'u' },
                            ],
                        },
                    },
                    {
                        id: 'unit',
                        field: 'unit',
                        headerName: 'Unidad',
                        size: 12,
                        select: {
                            label: 'Unidad',
                            options: [
                                'kg',
                                'gr',
                                'lt',
                                'ml',
                                'u',
                            ],
                        },
                    },
                ],
            },
        },
    },
};
