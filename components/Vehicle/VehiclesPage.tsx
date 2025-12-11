'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import VehicleModule from "./config";

export default function VehiclesPage() {
    return <ModuleDataGrid moduleSettings={VehicleModule}/>
}
