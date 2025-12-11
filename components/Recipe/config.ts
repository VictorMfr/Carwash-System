import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { RecipeSchema } from "@/lib/definitions";

const RecipeModule: ModuleFormGridData = {
    url: '/api/service/recipe',
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
            show: ['export', 'filter', 'columns', 'density', 'quickFilter', 'add', 'delete'],
        },
        create: {
            name: 'Crear receta',
            description: 'Crear receta',
            validation: RecipeSchema
        },
        edit: {
            name: 'Editar receta',
            description: 'Editar receta',
            validation: RecipeSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}

export default RecipeModule;