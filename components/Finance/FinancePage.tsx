'use client';

import ModuleDataGrid from "../ModuleDataGrid";
import { Grid } from "@mui/material";
import ModuleStats from "../ModuleStats/ModuleStats";
import ModuleStackCards from "../ModuleStackCards/ModuleStackCards";
import FinanceStatsModule from "./config/FinanceStatsModule";
import AccountsModule from "./config/AccountsModule";
import FinanceStackCards from "./config/FinanceStackCards";
import FinanceModule from "./config/FinanceModule";

export default function FinancePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <ModuleStats moduleStats={FinanceStatsModule} />
            </Grid>
            <Grid size={6}>
                <ModuleDataGrid moduleSettings={AccountsModule} />
            </Grid>
            <Grid size={12}>
                <ModuleStackCards moduleSettings={FinanceStackCards} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={FinanceModule} />
            </Grid>
        </Grid>
    );
}