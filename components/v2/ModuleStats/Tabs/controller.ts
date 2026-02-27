import { useModuleStatsContext } from "../context";

export default function useTabsController() {
    const context = useModuleStatsContext();

    const changeTab = (event: React.SyntheticEvent, newTab: number) => {
        context.setTab(newTab);
    }

    return {
        tab: context.tab,
        changeTab,
        tabs: context.settings.tabs,
    }
}