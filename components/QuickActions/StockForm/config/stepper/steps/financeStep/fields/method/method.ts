import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const method: formVanilla = {
    id: 'method',
    field: 'method',
    headerName: 'Método de pago',
    size: 6,
    autocomplete: {
        url: '/api/finance/method',
        searchField: 'name',
        newItemLabel: 'Agregar método de pago',
        config: {
            create: {
                description: 'Agregar método de pago',
                name: 'Agregar cuenta a cobrar',
            },
        },
        confirm: {
            title: 'Agregar método de pago',
            message: '¿Estás seguro de querer agregar este método de pago?',
            successMessage: 'Método de pago agregado correctamente',
        },
    },
};
