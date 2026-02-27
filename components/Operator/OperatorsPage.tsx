'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { OperatorDatagrid } from "./config/operatorDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function OperatorsPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Operadores</Typography>
                <Typography variant="body2">Gestiona los operadores de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={OperatorDatagrid} />
        </Stack>
    );
}
