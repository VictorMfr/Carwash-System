import type config from "@/types/v2/datagrid/config/config";
import { ServiceSchema } from "@/lib/definitions";

export const config: config = {
    spacing: 2,
    toolbar: {
        show: ['quickFilter', 'create', 'bulkDelete'],
    },
    modal: {
        fullScreen: true,
    },
    create: {
        name: 'Agregar servicio',
        description: 'Agregar servicio',
        validation: ServiceSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    edit: {
        hiddenAction: true,
    },
    delete: {
        hiddenAction: false,
    },
};
