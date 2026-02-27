import getDollarRate from "@/lib/dollar";
import type columns from "@/types/v2/datagrid/columns/columns";

const dollarRate = await getDollarRate();

export const auto: columns = {
    id: 'auto',
    field: 'auto',
    headerName: 'Tasa BCV',
    size: 12,
    columnHidden: true,
    switch: {
        disableIds: [
            {
                id: 'dollar_rate',
                value: dollarRate[0].promedio
            }
        ]
    }
}