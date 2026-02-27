import columns from "@/types/v2/datagrid/columns/columns";
import { Box } from '@mui/material';

export const dollarRate: columns = {
    id: 'dollar_rate',
    field: 'dollar_rate',
    headerName: 'Tasa de cambio',
    size: 6,
    flex: 1,
    number: { adornment: () => <Box sx={{ marginRight: 1 }}>Bs/$</Box>, adornmentPosition: 'start' },
};
