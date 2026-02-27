'use client';

//import ModuleDataGrid from "../ModuleDataGrid";
import { Grid, Typography, Stack } from "@mui/material";
import ModuleStats from "../ModuleStats/ModuleStats";
import ModuleStackCards from "../ModuleStackCards/ModuleStackCards";
import FinanceStatsModule from "./config_/FinanceStatsModule";
import FinanceStackCards from "./config_/FinanceStackCards";
import ModuleDataGrid from "../v2/ModuleDataGrid";
import { transactionsDatagrid } from "./config/transactionsDatagrid/datagrid";
import { accountsDatagrid } from "./config/accountsDatagrid/datagrid";
import ModuleDataGridv1 from "../ModuleDataGrid";
import PaymentModule from "../Service/config_/PaymentModule";

export default function FinancePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Estadísticas</Typography>
                        <Typography variant="body2">Gestiona las estadísticas de las finanzas.</Typography>
                    </Stack>
                    <ModuleStats moduleStats={FinanceStatsModule} />
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack>
                        <Typography variant="h4">Cuentas</Typography>
                        <Typography variant="body2">Gestiona las cuentas de las finanzas.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={accountsDatagrid} />
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2} sx={{ height: 500 }}>
                    <Stack>
                        <Typography variant="h4">Transacciones</Typography>
                        <Typography variant="body2">Gestiona las transacciones de las finanzas.</Typography>
                    </Stack>
                    <ModuleDataGrid settings={transactionsDatagrid} />
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2} sx={{ height: 500 }}>
                    <Stack>
                        <Typography variant="h4">Pagos</Typography>
                        <Typography variant="body2">Gestiona los pagos de los servicios.</Typography>
                    </Stack>
                    <ModuleDataGridv1 moduleSettings={PaymentModule} />
                </Stack>
            </Grid>
        </Grid>
    );
}