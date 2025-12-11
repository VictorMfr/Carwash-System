'use client';

import { Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import ModuleStats from "../ModuleStats/ModuleStats";
import ServiceModule from "./config/ServiceModule";
import PaymentModule from "./config/PaymentModule";
import ServicesStats from "./config/ServicesStats";

export default function ServicePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleStats moduleStats={ServicesStats} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleDataGrid moduleSettings={PaymentModule} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={ServiceModule} />
            </Grid>
        </Grid>
    )
}