import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const chargeAccount: formVanilla = {
    id: 'charge_account',
    field: 'charge_account',
    headerName: 'Cuenta a cobrar',
    size: 6,
    autocomplete: {
        url: '/api/finance/account',
        searchField: 'name',
        loadingText: 'Cargando cuentas...',
    }
}