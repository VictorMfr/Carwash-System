import { AccountObjectSchema } from "@/lib/definitions";
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
        name: 'Crear cuenta',
        description: 'Crear cuenta',
        validation: AccountObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar cuenta',
        description: 'Editar cuenta',
        validation: AccountObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
};
