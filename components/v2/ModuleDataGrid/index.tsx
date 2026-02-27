'use client';

import ModuleDataGridProvider from "./context";
import datagrid from "@/types/v2/datagrid/datagrid";
import DataGrid from "./DataGrid";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

/**
 * Componente principal de la grilla.
 * @param settings - Configuracion de la grilla, de tipo datagrid.
 * @returns Componente de la grilla.
 */
const ModuleDataGrid = ({ settings }: { settings: datagrid }) => {
    return (
        <ModuleDataGridProvider settings={settings}>
            <DataGrid />
        </ModuleDataGridProvider>
    )
}

export default withUIDisplayControls(ModuleDataGrid);