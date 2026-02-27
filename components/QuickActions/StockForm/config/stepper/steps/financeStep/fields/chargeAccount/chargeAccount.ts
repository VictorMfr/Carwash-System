import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { columns as accountColumns } from "@/components/Account/config/accountDatagrid/columns/columns";

export const chargeAccount: formVanilla = {
    id: 'charge_account',
    field: 'charge_account',
    headerName: 'Cuenta a cobrar',
    size: 6,
    autocomplete: {
        url: '/api/finance/account',
        searchField: 'name',
        newItemLabel: 'Agregar cuenta a cobrar',
        config: {
            create: {
                description: 'Agregar cuenta a cobrar',
                name: 'Agregar cuenta a cobrar',
            },
        },
        formData: {
            createFillField: 'name',
            columns: {
                config: {
                    spacing: 2,
                },
                contentType: 'application/json',
                fields: accountColumns as any,
            },
        },
    },
};
