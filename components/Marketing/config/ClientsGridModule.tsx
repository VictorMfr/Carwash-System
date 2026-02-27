import { ModuleFormGridData, ColumnData } from "@/types/datagrid/datagrid";
import { Chip } from "@mui/material";

const clientColumns: ColumnData[] = [
    { field: 'name', headerName: 'Nombre', width: 180, inputConfig: { size: 12, id: 'name' }, flex: 1 },
    { field: 'lastname', headerName: 'Apellido', width: 180, inputConfig: { size: 12, id: 'lastname' }, flex: 1 },
    { field: 'phone', headerName: 'Teléfono', width: 160, inputConfig: { size: 12, id: 'phone' }, flex: 1 },
];

const ClientsGridModule: ModuleFormGridData = {
    url: '/api/marketing/clients',
    label: 'Clientes',
    description: 'Búsqueda y consulta de clientes (solo lectura)',
    columns: {
        config: { gridSpacing: 2 },
        data: [
            ...clientColumns,
            { field: 'serviceCount', headerName: '# Servicios', width: 120, inputConfig: { size: 12, id: 'serviceCount' } },
            { field: 'totalSpent', headerName: 'Monto (Bs)', width: 140, inputConfig: { size: 12, id: 'totalSpent' }, renderCell: (p) => (Number(p.value || 0)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
            { field: 'loyaltyIndex', headerName: 'Fidelidad', width: 120, inputConfig: { size: 12, id: 'loyaltyIndex' }, renderCell: (p) => (Number(p.value || 0)).toFixed(2) },
            { field: 'delinquencyIndex', headerName: 'Morosidad', width: 120, inputConfig: { size: 12, id: 'delinquencyIndex' }, renderCell: (p) => (Number(p.value || 0)).toFixed(2) },
            { field: 'promotionEligible', headerName: 'Promoción', type: 'boolean', width: 130, inputConfig: { size: 12, id: 'promotionEligible' }, renderCell: (p) => <Chip label={p.value ? 'Sí' : 'No'} color={p.value ? 'success' : 'default'} size="small" /> },
            { field: 'reminderEligible', headerName: 'Recordatorio', type: 'boolean', width: 140, inputConfig: { size: 12, id: 'reminderEligible' }, renderCell: (p) => <Chip label={p.value ? 'Sí' : 'No'} color={p.value ? 'warning' : 'default'} size="small" /> },
        ],
    },
    config: {
        inputConfig: { allowCheckboxSelection: false },
        toolbar: {
            show: ['quickFilter']
        },
        append: {
            initialState: {
                sorting: {
                    sortModel: [{ field: 'loyaltyIndex', sort: 'desc' }]
                },
                filter: {
                    filterModel: {
                        items: [
                            { field: 'promotionEligible', operator: 'is', value: 'true' }
                        ]
                    }
                }
            }
        }
    },
};

export default ClientsGridModule;