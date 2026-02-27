import { Dialog } from "@mui/material";
import Header from "./Header/Header";
import actions from "@/types/v2/datagrid/actions/actions";
import Content from "./Content/Content";
import Actions from "./Actions/Actions";

export default function Modal({ 
    isOpen, 
    handleClose,
    action
}: { 
    isOpen: boolean, 
    handleClose: () => void,
    action: actions['options'][number]
}) {
    return (
        <Dialog 
        open={isOpen} 
        onClose={handleClose}
        {...action.modalConfig}
        >
            <Header closeHandler={handleClose} action={action} />
            <Content action={action} handleClose={handleClose}/>
        </Dialog>
    )
}