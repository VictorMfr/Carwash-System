'use client';

import ModuleStats from "../ModuleStats/ModuleStats";
import { Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import StockModule from "./config/StockModule";
import StockStats from "./config/StockStats";
import MaintenanceModule from "./config/MaintenanceModule";
import FailuresModule from "./config/FailuresModule";

export default function StockPage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleStats moduleStats={StockStats} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ height: 604 }}>
                <ModuleDataGrid moduleSettings={MaintenanceModule} />
            </Grid>
            <Grid size={12} sx={{ height: 604 }}>
                <ModuleDataGrid moduleSettings={FailuresModule} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid
                    moduleSettings={StockModule}
                />
            </Grid>
        </Grid>
    )
}
