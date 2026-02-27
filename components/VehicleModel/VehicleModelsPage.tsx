'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { VehicleModelDatagrid } from "./config/vehicleModelDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function VehicleModelsPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Modelos de vehículo</Typography>
                <Typography variant="body2">Gestiona los modelos de vehículos de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={VehicleModelDatagrid} />
        </Stack>
    );
}
