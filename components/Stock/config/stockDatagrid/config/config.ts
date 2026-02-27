import { StockObjectSchema, StockObjectUpdateSchema } from "@/lib/definitions";
import type config from "@/types/v2/datagrid/config/config";

export const config: config = {
    disableRowSelectionOnClick: true,
    rowSelection: true,
    checkboxSelection: false,
    spacing: 2,
    toolbar: {
        show: ['quickFilter', 'create'],
    },
    create: {
        name: 'Crear inventario',
        description: 'Crear inventario',
        hiddenAction: true,
        validation: StockObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar inventario',
        description: 'Editar inventario',
        validation: StockObjectUpdateSchema,
        contentType: 'application/json',
        hiddenAction: false,
    },
    delete: {
        hiddenAction: false,
    },
};
