import { useMediaQuery } from "@mui/material";

export default function useActionsController() {
    
    const mobileSize = useMediaQuery('(max-width: 600px)');
    const desktopSize = useMediaQuery('(min-width: 600px)');

    return {
        mobileSize,
        desktopSize,
    }
}