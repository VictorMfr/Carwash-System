'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { VehicleDatagrid } from "./config/vehicleDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function VehiclesPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Vehículos</Typography>
                <Typography variant="body2">Gestiona los vehículos de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={VehicleDatagrid} />
        </Stack>
    );
}
