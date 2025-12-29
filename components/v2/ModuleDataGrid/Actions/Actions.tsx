import { GridRenderCellParams } from "@mui/x-data-grid";
import useActionsController from "./controller";
import { Fragment } from "react";
import ActionItem from "./ActionItem/ActionItem";
import DefaultActions from "./DefaultActions/DefaultActions";

export default function Actions(params: GridRenderCellParams) {
    
    const controller = useActionsController();
    
    return (
        <Fragment>
            <DefaultActions params={params}/>
            {controller.actions?.options.map(action => (
                <ActionItem key={action.name} action={action} params={params} />
            ))}
        </Fragment>
    );
}