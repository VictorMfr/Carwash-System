import columns from "@/types/v2/datagrid/columns/columns";

export const category: columns = {
    id: 'category',
    field: 'category',
    headerName: 'Categoria',
    size: 12,
    flex: 1,
    select: {
        label: 'Categoria',
        options: [
            'Lavado',
            'Encerado',
            'Aspirado',
            'Interior',
            'Exterior',
            'Motor',
            'Llantas',
            'Pulido',
            'Polichado',
            'Detailing',
            'Paquete basico',
            'Paquete premium',
            'Paquete express',
            'Tiempo de espera',
            'Cobro',
            'Personal',
            'Sucursal',
            'Accesorios',
            'Garantia',
            'Otros',
        ],
    },
};
