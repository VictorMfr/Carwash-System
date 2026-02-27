import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import getDollarRate from "@/lib/dollar";

const dollarRate = await getDollarRate();

export const rateSwitch: formVanilla = {
    id: 'rate_switch',
    field: 'rate_switch',
    headerName: 'Tasa de cambio BCV',
    size: 6,
    switch: {
        disableIds: [{ id: 'dollar_rate', value: dollarRate[0].promedio }],
    },
};
