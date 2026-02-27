import useTabsController from "./controller";
import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";

export default function Tabs() {

    const controller = useTabsController();

    return (
        <MuiTabs onChange={controller.changeTab} value={controller.tab}>
            {controller.tabs.map((tab, index) => (
                <MuiTab key={`${tab.label}-${index}`} label={tab.label} />
            ))}
        </MuiTabs>
    )
}