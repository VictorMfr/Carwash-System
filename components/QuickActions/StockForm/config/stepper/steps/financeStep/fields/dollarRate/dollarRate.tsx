import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const dollarRate: formVanilla = {
    id: 'dollar_rate',
    field: 'dollar_rate',
    headerName: 'Tasa de cambio',
    size: 6,
    number: { adornment: () => <>Bs/$</>, adornmentPosition: 'start' },
};
