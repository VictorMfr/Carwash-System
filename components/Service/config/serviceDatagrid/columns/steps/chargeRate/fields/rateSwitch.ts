import columns from "@/types/v2/datagrid/columns/columns";
import getDollarRate from "@/lib/dollar";

const dollarRate = await getDollarRate();

export const rateSwitch: columns = {
    id: 'rate_switch',
    field: 'rate_switch',
    headerName: 'Tasa de cambio BCV',
    size: 6,
    columnHidden: true,
    switch: {
        disableIds: [{ id: 'dollar_rate', value: dollarRate[0].promedio }],
    },
};
