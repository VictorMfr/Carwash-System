import { StockDetailsObjectSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    rowHeight: 100,
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: false,
    spacing: 2,
    toolbar: {
        show: ['quickFilter', 'create', 'bulkDelete'],
    },
    create: {
        contentType: 'multipart/form-data',
        validation: StockDetailsObjectSchema,
        name: 'Crear detalle de stock',
        description: 'Crear detalle de stock',
        hiddenAction: false,
    },
    edit: {
        name: 'Editar producto',
        description: 'Editar producto',
        validation: StockDetailsObjectSchema,
        contentType: 'multipart/form-data',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
    modal: {
        fullWidth: true,
        fullScreen: true,
    }
};
