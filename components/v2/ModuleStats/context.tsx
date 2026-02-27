import { stats } from "@/types/v2/stats/stats";
import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

export interface ModuleStatsContextType {
    tab: number;
    setTab: Dispatch<SetStateAction<number>>;
    settings: stats;
}

export const ModuleStatsContext = createContext<ModuleStatsContextType>({
    tab: 0,
    setTab: () => {},
    settings: {} as stats,
});

export function useModuleStatsContext() {
    return useContext(ModuleStatsContext);
}

export function ModuleStatsProvider({ 
    children,
    settings
}: { 
    children: React.ReactNode,
    settings: stats
}) {
    const [tab, setTab] = useState(0);

    const data = {
        tab,
        setTab,
        settings,
    }


    return (
        <ModuleStatsContext.Provider value={data}>
            {children}
        </ModuleStatsContext.Provider>
    )
}
