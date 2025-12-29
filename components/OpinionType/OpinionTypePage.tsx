'use client';

import { Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import OpinionTypeModule from "./config";

export default function OpinionTypePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={OpinionTypeModule} />
            </Grid>
        </Grid>
    );
}