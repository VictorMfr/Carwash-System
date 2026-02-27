import { ModelObjectSchema } from "@/lib/definitions";
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
        name: 'Crear modelo',
        description: 'Crear modelo',
        validation: ModelObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar modelo',
        description: 'Editar modelo',
        validation: ModelObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
