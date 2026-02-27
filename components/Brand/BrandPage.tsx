'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { BrandDatagrid } from "./config/brandDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function BrandPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Marcas</Typography>
                <Typography variant="body2">Gestiona las marcas de los productos.</Typography>
            </Stack>
            <ModuleDataGrid settings={BrandDatagrid} />
        </Stack>
    )
}
