import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { CategoryObjectSchema, CategorySchema } from "@/lib/definitions";

const CategoryModule: ModuleFormGridData = {
    url: '/api/marketing/category',
    label: 'Categorías',
    description: 'Aquí puedes ver y gestionar las categorías de los comentarios.',
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
            name: 'Crear categoría',
            description: 'Crear categoría',
            validation: CategorySchema
        },
        edit: {
            name: 'Editar categoría',
            description: 'Editar categoría',
            validation: CategorySchema
        },
        toolbar: {
            show: ['quickFilter', 'add', 'delete']
        }
    }
}

export default CategoryModule;