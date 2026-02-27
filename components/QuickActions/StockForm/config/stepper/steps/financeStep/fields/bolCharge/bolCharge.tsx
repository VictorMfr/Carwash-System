import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const bolCharge: formVanilla = {
    id: 'bol_charge',
    field: 'bol_charge',
    headerName: 'Monto en bolívares',
    size: 6,
    number: { adornment: () => <>Bs</>, adornmentPosition: 'start' },
};
