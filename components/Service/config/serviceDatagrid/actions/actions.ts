import type actions from "@/types/v2/datagrid/actions/actions";
import ChangeStatusActionV2, { ChangeStatusActionIcon } from "@/components/Service/components/ChangeStatusActionV2";

export const actions: actions = {
    config: {
        field: 'actions',
        headerName: 'Acciones',
        width: 180,
    },
    options: [
        {
            name: 'Cambiar estado',
            description: 'Cambiar el estado del servicio',
            icon: ChangeStatusActionIcon,
            render: ChangeStatusActionV2,
            modalConfig: {
                fullWidth: true,
                maxWidth: 'sm',
            },
        },
    ],
}