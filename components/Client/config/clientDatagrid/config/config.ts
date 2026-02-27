import type config from "@/types/v2/datagrid/config/config";
import { ClientObjectSchema } from "@/lib/definitions";

export const config: config = {
    spacing: 2,
    checkboxSelection: true,
    rowSelection: true,
    disableRowSelectionOnClick: true,
    toolbar: {
        show: ['quickFilter', 'create', 'bulkDelete'],
    },
    create: {
        name: 'Crear cliente',
        description: 'Crear cliente',
        validation: ClientObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar cliente',
        description: 'Editar cliente',
        validation: ClientObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
};
