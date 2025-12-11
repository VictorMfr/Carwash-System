import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { MethodSchema } from "@/lib/definitions";

const MethodModule: ModuleFormGridData = {
    url: '/api/finance/method',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12,
                    id: 'name'
                }
            },
        ]
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
            name: 'Crear metodo',
            description: 'Crear metodo',
            validation: MethodSchema
        },
        edit: {
            name: 'Editar metodo',
            description: 'Editar metodo',
            validation: MethodSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}

export default MethodModule;