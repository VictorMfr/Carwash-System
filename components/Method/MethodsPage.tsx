'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { MethodDatagrid } from "./config/methodDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function MethodsPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Métodos</Typography>
                <Typography variant="body2">Gestiona los métodos de pago.</Typography>
            </Stack>
            <ModuleDataGrid settings={MethodDatagrid} />
        </Stack>
    )
}
