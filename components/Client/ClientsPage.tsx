'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { clientDatagrid } from "./config/clientDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function ClientsPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Clientes</Typography>
                <Typography variant="body2">Gestiona los clientes de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={clientDatagrid} />
        </Stack>
    );
}
