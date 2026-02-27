import { VechileBrandObjectSchema } from "@/lib/definitions";
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
        name: 'Crear marca',
        description: 'Crear marca',
        validation: VechileBrandObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar marca',
        description: 'Editar marca',
        validation: VechileBrandObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
