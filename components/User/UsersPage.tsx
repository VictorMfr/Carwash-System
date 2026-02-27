'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { usersDatagrid } from "./config/usersDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function UsersPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Usuarios</Typography>
                <Typography variant="body2">Gestiona los usuarios de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={usersDatagrid} />
        </Stack>
    );
}