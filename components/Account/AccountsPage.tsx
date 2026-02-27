'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { AccountDatagrid } from "./config/accountDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function AccountsPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Cuentas</Typography>
                <Typography variant="body2">Gestiona las cuentas de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={AccountDatagrid} />
        </Stack>
    )
}
