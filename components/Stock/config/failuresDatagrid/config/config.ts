import { FailureObjectSchema, FailureSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: false,
    spacing: 2,
    rowHeight: 100,
    toolbar: {
        show: ['create', 'quickFilter'],
    },
    create: {
        name: 'Crear falla',
        description: 'Crear falla',
        validation: FailureObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar falla',
        description: 'Editar falla',
        validation: FailureObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
