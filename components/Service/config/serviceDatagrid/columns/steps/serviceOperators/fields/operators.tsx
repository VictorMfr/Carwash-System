import columns from "@/types/v2/datagrid/columns/columns";
import { OperatorSchema } from "@/lib/definitions";
import ServiceOperatorsCell from "@/components/Service/components/OperatorsCell";
import { operatorCreateFields } from "./operatorCreateFields";

export const operators: columns = {
    id: 'operators',
    field: 'operators',
    headerName: 'Operadores',
    size: 12,
    flex: 1,
    autocomplete: {
        url: '/api/service/operator',
        searchField: 'name',
        newItemLabel: 'Agregar operador',
        loadingText: 'Cargando operadores...',
        multiple: true,
        config: {
            create: {
                name: 'Agregar operador',
                description: 'Agregar operador',
            },
        },
        formData: {
            createFillField: 'name',
            columns: {
                config: {
                    spacing: 2,
                },
                contentType: 'application/json',
                fields: operatorCreateFields,
            },
        },
    },
    renderCell: (params: any) => (
        <ServiceOperatorsCell operators={params.row.operators} />
    ),
};
