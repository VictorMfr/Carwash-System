import { Dialog } from "@mui/material";
import useModalController from "./controller";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Actions from "./Actions/Actions";

export default function Modal() {

    const controller = useModalController();

    return (
        <Dialog 
            open={controller.modalState.open}
            onClose={controller.closeModalHandler}
            {...controller.modalConfig}
        >
            <Header/>
            <Content/>
            <Actions/>
        </Dialog>
    )
}