import { Menu } from "@mui/icons-material";
import { Fragment } from "react";
import { IconButton } from "@mui/material";
import useHeaderController from "../controller";

export default function MenuIcon({ controller }: { controller: ReturnType<typeof useHeaderController> }) {
    return (
        <Fragment>
            {controller.dashboardContext.mobileOpen && (
                <IconButton onClick={controller.openMobileHandler}>
                    <Menu sx={{ color: 'white' }} />
                </IconButton>
            )}
        </Fragment>
    );
}