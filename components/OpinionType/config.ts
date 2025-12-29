import { OpinionTypeSchema } from "@/lib/definitions";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";

const OpinionTypeModule: ModuleFormGridData = {
    url: '/api/marketing/opinionType',
    label: 'Tipos de opinión',
    description: 'Aquí puedes ver los tipos de opinión de los comentarios.',
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
            }
        ]
    },
    config: {
        create: {
            name: 'Crear tipo de opinión',
            description: 'Crear tipo de opinión',
            validation: OpinionTypeSchema
        },
        edit: {
            name: 'Editar tipo de opinión',
            description: 'Editar tipo de opinión',
            validation: OpinionTypeSchema
        },
        toolbar: {
            show: ['quickFilter', 'add', 'delete']
        }
    }
}

export default OpinionTypeModule;