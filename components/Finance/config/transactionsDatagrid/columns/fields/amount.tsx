import type columns from "@/types/v2/datagrid/columns/columns";
import { Box } from "@mui/material";

export const amount: columns = {
    id: 'amount',
    field: 'amount',
    headerName: 'Monto',
    size: 6,
    number: {
        adornment: () => <Box sx={{ marginRight: 1, opacity: 0.5 }}>Bs</Box>,
        adornmentPosition: 'start'
    }
}