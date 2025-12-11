'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import RecipeModule from "./config";

export default function RecipesPage() {
    return <ModuleDataGrid moduleSettings={RecipeModule} />
}
