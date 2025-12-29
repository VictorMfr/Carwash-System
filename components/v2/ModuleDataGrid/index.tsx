'use client';

import ModuleDataGridProvider from "./context";
import datagrid from "@/types/v2/datagrid/datagrid";
import DataGrid from "./DataGrid";

export default function ModuleDataGrid({ settings }: { settings: datagrid }) {
    return (
        <ModuleDataGridProvider settings={settings}>
            <DataGrid />
        </ModuleDataGridProvider>
    )
}