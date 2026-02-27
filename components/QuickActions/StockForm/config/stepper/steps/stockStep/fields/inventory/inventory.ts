import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const inventoryField: formVanilla = {
    id: 'inventory',
    field: 'inventory',
    headerName: 'Inventario',
    size: 12,
    autocomplete: {
        url: '/api/stock',
        searchField: 'product',
        loadingText: 'Cargando inventario...',
    }
}