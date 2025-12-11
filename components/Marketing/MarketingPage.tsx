'use client';

import ModuleStats from "../ModuleStats/ModuleStats";
import { Stack } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import MarketingStatsModule from "./config/MarketingStatsModule";
import ClientsGridModule from "./config/ClientsGridModule";

export default function MarketingPage() {
    return (
        <Stack spacing={2}>
            <ModuleStats moduleStats={MarketingStatsModule} />
            <ModuleDataGrid moduleSettings={ClientsGridModule} />
        </Stack>
    )
}