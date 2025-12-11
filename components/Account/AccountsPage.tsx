'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { AccountModule } from "./config";

export default function AccountsPage() {
    return <ModuleDataGrid moduleSettings={AccountModule}/>
}
