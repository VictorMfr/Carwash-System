import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const operatorCreateFields: formVanilla[] = [
    {
        id: 'name',
        field: 'name',
        headerName: 'Nombre',
        size: 12,
    },
    {
        id: 'lastname',
        field: 'lastname',
        headerName: 'Apellido',
        size: 12,
    },
    {
        id: 'phone',
        field: 'phone',
        headerName: 'Teléfono',
        size: 12,
    },
    {
        id: 'address',
        field: 'address',
        headerName: 'Dirección',
        size: 12,
    },
];
