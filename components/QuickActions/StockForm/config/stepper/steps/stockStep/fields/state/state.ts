import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const stateField: formVanilla = {
    id: 'state',
    field: 'state',
    headerName: 'Estado',
    size: 6,
    autocomplete: {
        url: '/api/stock/state',
        searchField: 'name',
        loadingText: 'Cargando estados...',
    }
}