import { FailureSchema } from "@/lib/definitions";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import PictureCartItem from "@/components/ModuleForm/Inputs/Cart/PictureCartItem";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

const FailuresModule: ModuleFormGridData = {
    url: '/api/stock/failures',
    label: 'Fallas',
    description: 'Aquí puedes ver las fallas de tus herramientas.',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'stockDetail',
                headerName: 'Producto',
                renderCell: (params: GridRenderCellParams) => {
                    return <>{params.value.name}</>;
                },
                inputConfig: {
                    size: 12,
                    id: 'stockDetail',
                    autocomplete: {
                        url: '/api/stock/details',
                        label: 'Producto',
                        loadingType: 'screen',
                        labelField: 'name',
                        renderOption: (option) => <PictureCartItem option={option} />,
                    }
                }
            },
            {
                field: 'description',
                headerName: 'Descripción',
                inputConfig: {
                    size: 12,
                    id: 'description'
                }
            },
            {
                field: 'resolved',
                headerName: 'Resuelta',
                renderCell: (params: GridRenderCellParams) => { // un SI o No Text
                    return <Chip label={params.value ? 'SI' : 'NO'} color={params.value ? 'success' : 'error'} size="small" />;

                },

                inputConfig: {
                    size: 12,
                    id: 'resolved',
                    switch: {
                        label: 'Resuelta',
                    }
                }
            }
        ]
    },
    config: {
        create: {
            name: 'Crear falla',
            description: 'Crear falla',
            validation: FailureSchema
        },
        edit: {
            name: 'Editar falla',
            description: 'Editar falla',
            validation: FailureSchema
        },
        toolbar: {
            show: ['add']
        },
        inputConfig: {
            allowCheckboxSelection: false
        }
        
    }
}

export default FailuresModule;