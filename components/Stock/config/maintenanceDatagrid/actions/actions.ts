import type actions from "@/types/v2/datagrid/actions/actions";
import { ChangeCircle } from "@mui/icons-material";
import StateModal from "../../../StateModal";

export const actions: actions = {
    config: {
        field: 'actions',
        headerName: 'Acciones',
        width: 150,
    },
    options: [
        {
            name: 'Cambiar estado',
            description: 'Cambiar el estado del producto',
            icon: ChangeCircle,
            render: StateModal
        }
    ],
};
