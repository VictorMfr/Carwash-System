import useActionsController from "./controller";
import MobileActions from "./Mobile/Mobile";
import DesktopActions from "./Desktop/Desktop";
import { Fragment } from "react";

export default function Actions() {

    const controller = useActionsController();
    
    return (
        <Fragment>
            {controller.mobileSize && <MobileActions />}
            {controller.desktopSize && <DesktopActions />}
        </Fragment>
    )
}