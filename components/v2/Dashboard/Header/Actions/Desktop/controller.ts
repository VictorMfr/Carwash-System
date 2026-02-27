import { useHeaderContext } from "../../context";
import { useRouter } from "next/navigation";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useDesktopActionsController() {
    const headerCtx = useHeaderContext();
    const router = useRouter();
    const uiContext = useUIDisplayControls();

    return {
        actions: headerCtx.settings.actions,
        router,
        uiContext,
    }
}