'use client';

import ModuleDataGrid from "../ModuleDataGrid";
import { UserModule } from "./config";

export default function UsersPage() {
    return <ModuleDataGrid moduleSettings={UserModule} />
}