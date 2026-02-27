import columns from "@/types/v2/datagrid/columns/columns";

export const vehicleLicensePlate: columns = {
    id: 'vehicleLicensePlate',
    field: 'vehicleLicensePlate',
    headerName: 'Placa de vehículo',
    size: 12,
    flex: 1,
    autocomplete: {
        url: '/api/service/vehicle',
        searchField: 'license_plate',
        newItemLabel: 'Agregar placa de vehículo',
        loadingText: 'Cargando placas de vehículo...',
    },
};
