import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const brand: formVanilla = {
    id: 'brand',
    field: 'brand',
    headerName: 'Marca',
    size: 6,
    autocomplete: {
        url: '/api/stock/brand',
        searchField: 'name',
        loadingText: 'Cargando marcas...',
    }
}