'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { StockDetailsDatagrid } from "./config/stockDetailsDatagrid/datagrid";
import { Box, Stack, Typography } from "@mui/material";

export default function StockDetailsPage({ stockId, product }: { stockId: string, product?: any }) {
    StockDetailsDatagrid.url = `/api/stock/${stockId}/details`;

    // Set quantity adornment with product unit
    try {
        const steps = (StockDetailsDatagrid.columns as any)?.steps ?? [];
        const stepOne = steps[0];
        const quantityField = stepOne?.fields?.find?.((f: any) => f.field === 'quantity');
        if (quantityField?.number) {
            quantityField.number = {
                ...(quantityField.number ?? {}),
                adornment: () => <Box sx={{ marginRight: 1, opacity: 0.5 }}>{product?.unit ?? ''}</Box>,
                adornmentPosition: 'start'
            };
        } else if (quantityField) {
            quantityField.number = {
                adornment: () => <Box sx={{ marginRight: 1, opacity: 0.5 }}>{product?.unit ?? ''}</Box>,
                adornmentPosition: 'start'
            };
        }
    } catch {}

    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant="h4">Detalles de stock</Typography>
                <Typography variant="body2">Gestiona los detalles de: {product?.name ?? ''}</Typography>
            </Stack>
            <ModuleDataGrid settings={StockDetailsDatagrid} />
        </Stack>
    )
}