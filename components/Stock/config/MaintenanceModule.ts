import { ChangeCircle } from "@mui/icons-material";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { Build } from "@mui/icons-material";
import PictureCell from "@/components/ModuleDataGrid/PictureCell";
import StateModal from "../StateModal";

const MaintenanceModule: ModuleFormGridData = {
    url: '/api/maintenance/tools',
    label: 'Mantenimiento',
    description: 'Aquí puedes ver el mantenimiento de tus herramientas.',
    icon: Build,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'picture',
                headerName: 'Imagen',
                inputConfig: {
                    size: 12,
                    id: 'picture'
                },
                flex: 1,
                renderCell: PictureCell
            },
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12,
                    id: 'name'
                },
                flex: 1,
            },
            {
                field: 'brand',
                headerName: 'Marca',
                inputConfig: {
                    size: 12,
                    id: 'brand'
                },
                flex: 1,
            },
            {
                field: 'state',
                headerName: 'Estado',
                inputConfig: {
                    size: 12,
                    id: 'state'
                },
                flex: 1,
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [
            {
                name: 'Cambiar estado',
                icon: ChangeCircle,
                dispatch: StateModal
            },
        ]
    },
    config: {
        rowHeight: 100,
        inputConfig: {
            allowCheckboxSelection: false
        },
        toolbar: {
            show: ['quickFilter']
        }
    }
}

export default MaintenanceModule;