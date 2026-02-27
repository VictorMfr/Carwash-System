'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { RecipeDatagrid } from "./config/recipeDatagrid/datagrid";
import { Stack, Typography } from "@mui/material";

export default function RecipesPage() {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack>
                <Typography variant="h4">Recetas</Typography>
                <Typography variant="body2">Gestiona las recetas de la empresa.</Typography>
            </Stack>
            <ModuleDataGrid settings={RecipeDatagrid} />
        </Stack>
    );
}
