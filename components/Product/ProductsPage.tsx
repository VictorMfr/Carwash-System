'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { ProductDatagrid } from "./config/productDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function ProductsPage() {
    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Productos</Typography>
                <Typography variant="body2">Gestiona los productos de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={ProductDatagrid} />
        </Stack>
    )
}
