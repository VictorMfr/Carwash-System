import { IconButton, Tooltip } from "@mui/material";
import useActionItemController from "./controller";
import { Fragment } from "react";
import Modal from "./Modal/Modal";


export default function ActionItem() {

    const controller = useActionItemController();

    return (
        <Fragment>
            <Tooltip title={controller.action.name}>
                <IconButton onClick={controller.handleClick}>
                    <controller.action.icon />
                </IconButton>
            </Tooltip>
            <Modal
                action={controller.action}
                isOpen={controller.isOpen}
                handleClose={controller.handleClose}
            />
        </Fragment>
    )
}