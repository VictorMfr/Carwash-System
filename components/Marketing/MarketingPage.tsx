'use client';

import ModuleStats from "../v2/ModuleStats";
import { Stack } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import ClientsGridModule from "./config/ClientsGridModule";
import { marketingStats } from "./config/stats/marketingStats";
import { stats } from "@/types/v2/stats/stats";

export default function MarketingPage() {
    return (
        <Stack spacing={2}>
            <ModuleStats settings={marketingStats} />
            <ModuleDataGrid moduleSettings={ClientsGridModule} />
        </Stack>
    )
}