'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import VehicleModelModule from "./config";

export default function VehicleModelsPage() {
    return <ModuleDataGrid moduleSettings={VehicleModelModule}/>
}
