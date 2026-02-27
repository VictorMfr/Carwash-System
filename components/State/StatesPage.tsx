'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { StateDatagrid } from "./config/stateDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function StatesPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Estados</Typography>
                <Typography variant="body2">Gestiona los estados de los productos.</Typography>
            </Stack>
            <ModuleDataGrid settings={StateDatagrid} />
        </Stack>
    )
}
