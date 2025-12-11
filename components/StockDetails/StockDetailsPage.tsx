'use client';

import ModuleDataGrid from "../ModuleDataGrid";
import StockDetailsSettings from "./config";

export default function StockDetailsPage({ stockId, product }: { stockId: string, product?: any }) {
    StockDetailsSettings.url = `/api/stock/${stockId}/details`;

    // Set quantity adornment with product unit
    try {
        const steps = (StockDetailsSettings.columns?.stepper as any)?.steps ?? [];
        const stepOne = steps[0];
        const quantityField = stepOne?.data?.find?.((f: any) => f.field === 'quantity');
        if (quantityField?.inputConfig) {
            quantityField.inputConfig.number = {
                ...(quantityField.inputConfig.number ?? {}),
                adornment: () => <>{product?.unit ?? ''}</>,
                adornmentPosition: 'start'
            };
        }
    } catch {}

    return <ModuleDataGrid moduleSettings={StockDetailsSettings} />
}