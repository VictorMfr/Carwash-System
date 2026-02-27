import { GridRenderCellParams } from "@mui/x-data-grid";
import useActionsController from "./controller";
import { Fragment } from "react";
import DefaultActions from "./DefaultActions/DefaultActions";
import ActionItemIndex from "./ActionItem";

export default function Actions(params: GridRenderCellParams) {

    const controller = useActionsController(params);

    return (
        <Fragment>
            <DefaultActions params={params} />
            {controller.actions?.options.map(action => (
                <ActionItemIndex
                    key={action.name}
                    params={params}
                    action={action}
                />
            ))}
        </Fragment>
    );
}