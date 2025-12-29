import { Fragment } from "react";
import useUpdateActionController from "./controller";
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function UpdateAction({ params }: { params: GridRenderCellParams }) {
    const controller = useUpdateActionController(params);

    if (!controller.editable) return null;

    return (
        <Fragment>
            <Tooltip title={"Editar"}>
                <IconButton onClick={controller.handleUpdate}>
                    <Edit />
                </IconButton>
            </Tooltip>
        </Fragment>
    )
}