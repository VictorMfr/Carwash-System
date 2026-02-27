import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { Box } from "@mui/material";

export const bolCharge: formVanilla = {
    id: 'bol_charge',
    field: 'bol_charge',
    headerName: 'Monto en bolívares',
    size: 6,
    number: { adornment: () => <Box sx={{ marginRight: 1, opacity: 0.5 }}>Bs</Box>, adornmentPosition: 'start' }
}