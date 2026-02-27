import { RecipeObjectSchema } from "@/lib/definitions";
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
        name: 'Crear receta',
        description: 'Crear receta',
        validation: RecipeObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar receta',
        description: 'Editar receta',
        validation: RecipeObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
