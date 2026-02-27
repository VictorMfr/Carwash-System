import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const method: formVanilla = {
    id: 'method',
    field: 'method',
    headerName: 'Método de pago',
    size: 6,
    autocomplete: {
        url: '/api/finance/method',
        searchField: 'name',
        loadingText: 'Cargando métodos de pago...',
    }
}