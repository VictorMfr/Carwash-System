import actions from "@/types/v2/datagrid/actions/actions";
import { DialogContent } from "@mui/material";
import useModalContentController from "./controller";

export default function Content({
    handleClose
}: {
    action: actions['options'][number],
    handleClose: () => void
}) {

    const controller: any = useModalContentController();


    return (
        <DialogContent>
            <controller.action.render
                handleClose={handleClose}
                params={controller.params}
            />
        </DialogContent>
    );
}