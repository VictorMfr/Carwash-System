'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ClientModule } from "./config";

export default function ClientsPage() {
    return <ModuleDataGrid moduleSettings={ClientModule}/>
}
