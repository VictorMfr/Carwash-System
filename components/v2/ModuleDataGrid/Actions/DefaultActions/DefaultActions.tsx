import { Fragment } from "react";
import DeleteAction from "./DeleteAction/DeleteAction";
import UpdateAction from "./UpdateAction/UpdateAction";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function DefaultActions({ params }: { params: GridRenderCellParams }) {
    return (
        <Fragment>
            <DeleteAction params={params}/>
            <UpdateAction params={params}/>
        </Fragment>
    );
}