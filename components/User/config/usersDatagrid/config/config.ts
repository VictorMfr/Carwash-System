import { UserObjectCreateSchema, UserObjectUpdateSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: true,
    spacing: 2,

    create: {
        name: 'Crear usuario',
        description: 'Crear usuario',
        validation: UserObjectCreateSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar usuario',
        description: 'Editar usuario',
        validation: UserObjectUpdateSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
    toolbar: {
        show: ['quickFilter', 'bulkDelete', 'create']
    }
}