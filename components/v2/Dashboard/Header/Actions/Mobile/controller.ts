import { useHeaderContext } from "../../context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

export default function useMobileActionsController() {
    const headerCtx = useHeaderContext();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const uiContext = useUIDisplayControls();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false);
    };

    return {
        actions: headerCtx.settings.actions,
        isOpen,
        anchorEl,
        router,
        handleOpen,
        handleClose,
        uiContext,
    }   
}