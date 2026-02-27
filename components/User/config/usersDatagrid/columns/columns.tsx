import type columns from "@/types/v2/datagrid/columns/columns";
import { defaultRoles } from "@/services/backend/config/createAccess";

export const columns: columns[] = [
    {
        id: 'name',
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        size: 6,
        flex: 1,
    },
    {
        id: 'lastname',
        field: 'lastname',
        headerName: 'Apellido',
        width: 150,
        size: 6,
        flex: 1,
    },
    {
        id: 'email',
        field: 'email',
        headerName: 'Email',
        size: 6,
        flex: 1,
    },
    {
        id: 'phone',
        field: 'phone',
        headerName: 'Teléfono',
        size: 6,
        flex: 1,
    },
    {
        id: 'address',
        field: 'address',
        headerName: 'Dirección',
        size: 6,
        flex: 1,
    },
    {
        id: 'password',
        field: 'password',
        headerName: 'Contraseña',
        size: 6,
        columnHidden: true,
        updateHidden: true,
        TextFieldProps: {
            type: 'password',
        },
        flex: 1,
    },
    {
        id: 'role',
        field: 'role',
        headerName: 'Rol',
        size: 12,
        select: {
            label: 'Rol',
            options: ['Auditor Inventario', 'Auditor Finanzas', 'Soporte cliente', 'Auditor Marketing', 'Auditor RRHH']
        },
        flex: 1,
    }
]