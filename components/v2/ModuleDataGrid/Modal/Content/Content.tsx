import ModuleForm from "@/components/v2/ModuleForm";
import { DialogContent } from "@mui/material";
import useModalContentController from "./controller/controller";
import Actions from "./Actions/Actions";
import { Fragment } from "react";

export default function Content() {

    const controller = useModalContentController();

    return (
        <Fragment>
            <DialogContent>
                <ModuleForm
                    settings={controller.settings}
                    controls={controller.controls}
                />
            </DialogContent>
            <Actions formControls={controller.controls} />
        </Fragment>
    )
}