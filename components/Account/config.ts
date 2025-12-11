import { AccountSchema } from "@/lib/definitions";
import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import { FormData } from "@/types/form/form";

export const AccountFormData: FormData = {
    data: [
        {
            field: 'name',
            headerName: 'Nombre',
            inputConfig: {
                size: 12,
                id: 'name',
            }
        },
        {
            field: 'description',
            headerName: 'Descripción',
            inputConfig: {
                size: 12,
                id: 'description'
            }
        }
    ]
}

export const AccountModule: ModuleFormGridData = {
    url: '/api/finance/account',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: AccountFormData.data
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: []
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear cuenta',
            description: 'Crear cuenta',
            validation: AccountSchema
        },
        edit: {
            name: 'Editar cuenta',
            description: 'Editar cuenta',
            validation: AccountSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}