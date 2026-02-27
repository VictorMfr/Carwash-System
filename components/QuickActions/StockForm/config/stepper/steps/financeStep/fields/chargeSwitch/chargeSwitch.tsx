import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export const chargeSwitch: formVanilla = {
    id: 'charge_switch',
    field: 'charge_switch',
    headerName: 'Monto en dolares',
    size: 6,
    switch: {
        swapIds: [
            {
                id: 'bol_charge',
                value: {
                    field: 'dollar_charge',
                    headerName: 'Monto en dolares',
                    size: 6,
                    id: 'dollar_charge',
                    number: { adornment: () => <>$</>, adornmentPosition: 'start' }
                }
            }
        ]
    }
} 