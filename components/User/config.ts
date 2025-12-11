import { UserCreateSchema, UserUpdateSchema } from "@/lib/definitions";
import { ModuleFormGridData, ToolbarItem } from "@/types/datagrid/datagrid";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignRoleModal from "./AssignRoleModal";

// Definimos las columnas del usuario de forma modular
const userColumns = [
    {
        field: 'name',
        headerName: 'Nombre',
        inputConfig: {
            size: 6,
            id: 'name'
        },
        flex: 1
    },
    {
        field: 'lastname',
        headerName: 'Apellido',
        inputConfig: {
            size: 6,
            id: 'lastname'
        },
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        inputConfig: {
            size: 6,
            id: 'email'
        },
        flex: 1
    },
    {
        field: 'phone',
        headerName: 'Teléfono',
        inputConfig: {
            size: 6,
            id: 'phone'
        },
        flex: 1
    },
    {
        field: 'address',
        headerName: 'Dirección',
        inputConfig: {
            size: 6,
            id: 'address'
        },
        flex: 1
    },
    {
        field: 'password',
        headerName: 'Contraseña',
        inputConfig: {
            size: 6,
            TextFieldProps: {
                type: 'password',
                id: 'password'
            },
            hideIfUpdate: true,
            dataGridHidden: true,
            id: 'password'
        },
        flex: 1
    }
];

// Definimos las acciones de usuario de forma modular
const userActions = [
    {
        name: 'Asignar rol',
        icon: AssignmentIcon,
        dispatch: AssignRoleModal
    }
];

// Config general modular
const userToolbarConfig = ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete'];

const userCreateConfig = {
    name: 'Crear usuario',
    description: 'Llena los campos para crear un nuevo usuario',
    validation: UserCreateSchema
};

const userEditConfig = {
    name: 'Editar usuario',
    description: 'Llena los campos para editar el usuario',
    validation: UserUpdateSchema
};

const userDeleteConfig = {
    hiddenAction: false
};

// Exportando el módulo principal ensamblando las partes modulares
export const UserModule: ModuleFormGridData = {
    url: '/api/user',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: userColumns
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: userActions
    },
    config: {
        toolbar: {
            show: userToolbarConfig as ToolbarItem[]
        },
        create: userCreateConfig,
        edit: userEditConfig,
        delete: userDeleteConfig
    }
}