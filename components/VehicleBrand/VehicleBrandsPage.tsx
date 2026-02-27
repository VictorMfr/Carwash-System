'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { VehicleBrandDatagrid } from "./config/vehicleBrandDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function VehicleBrandsPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Marcas de vehículo</Typography>
                <Typography variant="body2">Gestiona las marcas de vehículos de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={VehicleBrandDatagrid} />
        </Stack>
    );
}
