import { VehicleWithUserObjectSchema } from "@/lib/definitions";
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
        name: 'Crear vehículo',
        description: 'Crear vehículo',
        validation: VehicleWithUserObjectSchema,
        contentType: 'application/json',
    },
    edit: {
        name: 'Editar vehículo',
        description: 'Editar vehículo',
        validation: VehicleWithUserObjectSchema,
        contentType: 'application/json',
    },
    delete: {
        hiddenAction: false,
    },
};
