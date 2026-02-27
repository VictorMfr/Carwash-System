'use client';

import { Grid, Typography, Stack } from "@mui/material";
import ModuleDataGrid from "../v2/ModuleDataGrid";
import ModuleDataGridv1 from "../ModuleDataGrid";
import ModuleStatsv1 from "../ModuleStats/ModuleStats";
import PaymentModule from "./config_/PaymentModule";
import ServicesStats from "./config_/ServicesStats";
import { serviceDatagrid } from "./config/serviceDatagrid/datagrid";

export default function ServicePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Estadísticas</Typography>
                        <Typography variant="body2">Gestiona las estadísticas de los servicios.</Typography>
                    </Stack>
                    <ModuleStatsv1 moduleStats={ServicesStats} />
                </Stack>
            </Grid>
            
            <Grid size={12}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Servicios</Typography>
                        <Typography variant="body2">Gestiona los servicios de la empresa.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={serviceDatagrid} />
                </Stack>
            </Grid>
        </Grid>
    );
}

/*
    Que pasa si un servicio se completa, se crea la transaccion, pero el usuario
    elimina la transaccion? Como quedaran los operadores que realizaron el servicio?

    Antes de borrar una transaccion, se debe verificar si la transaccion a borrar
    esta relacionada a un servicio. Si lo esta, bloquear la eliminacion de la transaccion.
    
*/