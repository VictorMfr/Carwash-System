import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import useMenuController from "./controller";

export default function Menu() {

    const controller = useMenuController();

    if (!controller.mobileSize) return <></>;
    
    return (
        <IconButton onClick={controller.handleMenuClick}>
            <MenuIcon sx={{ color: 'white' }}/>
        </IconButton>
    )
}