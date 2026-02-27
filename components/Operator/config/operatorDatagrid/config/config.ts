import { OperatorObjectSchema } from "@/lib/definitions";
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
        name: 'Crear operador',
        description: 'Crear operador',
        validation: OperatorObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar operador',
        description: 'Editar operador',
        validation: OperatorObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
