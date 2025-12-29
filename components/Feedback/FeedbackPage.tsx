'use client';

import { Grid, Stack } from "@mui/material";
import FeedBackModule from "./config";
import ModuleDataGrid from "../ModuleDataGrid";
import ModuleStats from "../ModuleStats/ModuleStats";
import FeedbackStatsModule from "./config/FeedbackStatsModule";

export default function FeedbackPage() {
    return (
        <Stack spacing={2}>
            <ModuleStats moduleStats={FeedbackStatsModule} />
            <Grid container spacing={2}>
                <Grid size={12}>
                    <ModuleDataGrid moduleSettings={FeedBackModule} />
                </Grid>
            </Grid>
        </Stack>
    )
}