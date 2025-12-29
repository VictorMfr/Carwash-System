import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import dayjs from "dayjs";

const NotificationModuleSettings: ModuleFormGridData = {
    url: "/api/notification",
    label: "Historial de notificaciones",
    description: "Actividad reciente de servicios y finanzas",
    columns: {
        config: {
            gridSpacing: 2,
        },
        data: [
            {
                field: "date",
                headerName: "Fecha",
                width: 140,
                sortable: false,
                inputConfig: {
                    size: 12,
                    id: "date",
                },
            },
            {
                field: "title",
                headerName: "Título",
                flex: 1.3,
                minWidth: 220,
                sortable: false,
                inputConfig: {
                    size: 12,
                    id: "title",
                },
            },
            {
                field: "description",
                headerName: "Descripción",
                flex: 1.4,
                minWidth: 260,
                sortable: false,
                inputConfig: {
                    size: 12,
                    id: "description",
                },
            },
        ],
    },
    config: {
        rowHeight: 64,
        toolbar: {
            show: ["quickFilter", "columns", "export", "filter", "density"],
        },
        inputConfig: {
            allowCheckboxSelection: false,
        },
    },
};

export default NotificationModuleSettings;

