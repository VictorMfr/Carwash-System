import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { AccountBalance } from "@mui/icons-material";

const AccountsModule: ModuleFormGridData = {
    url: '/api/finance/account/balance',
    label: 'Cuentas',
    description: 'Aquí puedes ver las cuentas de tu empresa.',
    icon: AccountBalance,
    columns: {
        config: {
            gridSpacing: 2,
        },
        data: [
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
                field: 'balance',
                headerName: 'Balance',
                inputConfig: {
                    size: 12,
                    id: 'balance'
                },
                flex: 1,
            },
        ]
    },
    
    config: {
        rowHeight: 60,
        inputConfig: {
            allowCheckboxSelection: false
        },
        toolbar: {
            show: ['quickFilter', 'columns']
        }
    }
}

export default AccountsModule;