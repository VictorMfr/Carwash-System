import columns from "@/types/v2/datagrid/columns/columns";
import { Box } from "@mui/material";

export const bolCharge: columns = {
    id: 'bol_charge',
    field: 'bol_charge',
    headerName: 'Monto en bolívares',
    size: 6,
    flex: 1,
    number: { adornment: () => <Box sx={{ marginRight: 1 }}>Bs</Box>, adornmentPosition: 'start' },
};
