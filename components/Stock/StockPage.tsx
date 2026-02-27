'use client';

import ModuleStats from "../ModuleStats/ModuleStats";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import StockStats from "./config/StockStats";
import ModuleDataGrid from "../v2/ModuleDataGrid";
import { FailuresDatagrid } from "./config/failuresDatagrid/datagrid";
import { MaintenanceDatagrid } from "./config/maintenanceDatagrid/datagrid";
import { StockDatagrid } from "./config/stockDatagrid/datagrid";

export default function StockPage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Estadísticas</Typography>
                        <Typography variant="body2">Gestiona las estadísticas de los productos.</Typography>
                    </Stack>
                    <ModuleStats moduleStats={StockStats} />
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ height: 604 }}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Mantenimientos</Typography>
                        <Typography variant="body2">Gestiona los mantenimientos de los productos.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={MaintenanceDatagrid} />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Stock</Typography>
                        <Typography variant="body2">Gestiona el stock de los productos.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={StockDatagrid} />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Fallas</Typography>
                        <Typography variant="body2">Gestiona las fallas de los productos.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={FailuresDatagrid} />
                </Stack>
            </Grid>
        </Grid>
    )
}
