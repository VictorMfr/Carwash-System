import { ProductObjectSchema, ProductSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: true,
    spacing: 2,
    toolbar: {
        show: ['quickFilter', 'create', 'bulkDelete'],
    },
    create: {
        name: 'Crear producto',
        description: 'Crear producto',
        validation: ProductObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar producto',
        description: 'Editar producto',
        validation: ProductObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
};
