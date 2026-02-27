import { FeedbackObjectSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    spacing: 2,
    checkboxSelection: true,
    rowSelection: true,
    disableRowSelectionOnClick: true,
    toolbar: {
        show: ['quickFilter', 'filter', 'export', 'download', 'create'],
    },
    create: {
        name: 'Agregar comentario',
        description: 'Agregar comentario',
        validation: FeedbackObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar comentario',
        description: 'Editar comentario',
        validation: FeedbackObjectSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
    modal: {
        fullWidth: true,
    }
};
