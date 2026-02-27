import type config from "@/types/v2/datagrid/config/config";
import { FinanceObjectSchema } from "@/lib/definitions";

export const config: config = {
    spacing: 2,
    toolbar: {
        show: ['quickFilter', 'create'],
    },
    create: {
        name: 'Crear transacción',
        description: 'Crear transacción',
        validation: FinanceObjectSchema,
        contentType: 'application/json',
        hiddenAction: true,
    },
}