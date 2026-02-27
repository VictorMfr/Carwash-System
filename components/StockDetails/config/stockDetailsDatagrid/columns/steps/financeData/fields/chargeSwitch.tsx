import columns from "@/types/v2/datagrid/columns/columns";
import { Box } from "@mui/material";
import { Fragment } from "react";

export const chargeSwitch: columns = {
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
                    number: { adornment: () => <Box sx={{ marginRight: 1, opacity: 0.5 }}>$</Box>, adornmentPosition: 'start' }
                }
            }
        ]
    },
    renderCell: (params: any) => (
        <Fragment>
            {params.row.dollar_charge !== null && params.row.dollar_charge !== undefined
                ? Number(params.row.dollar_charge).toFixed(2)
                : ''}
        </Fragment>
    )
}