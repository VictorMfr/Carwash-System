import { ModuleFormGridData } from "@/types/datagrid/datagrid";

const FeedBackModule: ModuleFormGridData = {
    url: '/api/marketing/feedback',
    label: 'Comentarios',
    description: 'Aquí puedes ver los comentarios de los clientes.',
    columns: {
        config: {
            gridSpacing: 2
        },
        stepper: {
            orientation: 'horizontal',
            steps: [
                {
                    label: 'Metadatos del comentario',
                    config: {
                        gridSpacing: 2
                    },
                    data: [
                        {
                            field: 'client',
                            headerName: 'Cliente',
                            flex: 1,
                            inputConfig: {
                                size: 12,
                                id: 'client',
                                autocomplete: {
                                    url: '/api/service/client',
                                    label: 'Cliente',
                                    loadingType: 'screen',
                                    labelField: 'name',
                                }
                            }
                        },
                        {
                            field: 'opinionType',
                            headerName: 'Tipo de opinión',
                            flex: 1,
                            inputConfig: {
                                size: 12,
                                id: 'opinionType',
                                autocomplete: {
                                    url: '/api/marketing/opinionType',
                                    label: 'Tipo de opinión',
                                    loadingType: 'screen',
                                    labelField: 'name',
                                }
                            }
                        },
                        {
                            field: 'category',
                            headerName: 'Categoría',
                            flex: 1,
                            inputConfig: {
                                size: 12,
                                id: 'category',
                                autocomplete: {
                                    url: '/api/marketing/category',
                                    label: 'Categoría',
                                    loadingType: 'screen',
                                    labelField: 'name',
                                }
                            }
                        }
                    ],
                },
                {
                    label: 'Contenido del comentario',
                    config: {
                        gridSpacing: 2
                    },
                    data: [
                        {
                            field: 'description',
                            headerName: 'Descripción',
                            flex: 1,
                            inputConfig: {
                                size: 12,
                                id: 'description',
                                TextFieldProps: {
                                    multiline: true,
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },

    config: {
        create: {
            name: 'Agregar comentario',
            description: 'Agregar comentario',
        },
        toolbar: {
            show: ['add', 'quickFilter']
        }
    }
}

export default FeedBackModule;