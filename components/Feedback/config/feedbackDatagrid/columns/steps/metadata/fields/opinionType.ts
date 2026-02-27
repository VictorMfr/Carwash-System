import columns from "@/types/v2/datagrid/columns/columns";

export const opinionType: columns = {
    id: 'opinionType',
    field: 'opinionType',
    headerName: 'Tipo de opinion',
    size: 12,
    flex: 1,
    select: {
        label: 'Tipo de opinion',
        options: [
            'Excelente',
            'Muy bueno',
            'Bueno',
            'Regular',
            'Malo',
            'Muy malo',
            'Recomendacion',
            'Queja',
            'Sugerencia',
            'Felicitacion',
            'Reclamo',
            'Consulta',
            'Incidente',
            'Rapidez',
            'Atencion',
            'Calidad',
            'Precio',
            'Servicio',
            'Instalaciones',
            'Otros',
        ],
    },
};
