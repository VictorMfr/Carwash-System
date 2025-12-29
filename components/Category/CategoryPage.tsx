'use client';

import { Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import CategoryModule from "./config";

export default function CategoryPage() {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={CategoryModule} />
            </Grid>
        </Grid>
    );
}