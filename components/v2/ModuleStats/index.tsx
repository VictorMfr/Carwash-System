import { ModuleStatsProvider } from "./context";
import Stats from "./Stats";
import { stats } from "@/types/v2/stats/stats";

export default function ModuleStats({ settings }: { settings: stats }) {
    return (
        <ModuleStatsProvider settings={settings}>
            <Stats />
        </ModuleStatsProvider>
    )
}