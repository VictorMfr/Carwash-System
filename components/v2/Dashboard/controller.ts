import { useDashboardContext } from "./context";

export default function useDashboardController() {

    const { settings } = useDashboardContext();

    return {
        settings,
    }
}