import { DialogTitle, Typography } from "@mui/material";
import useModalHeaderController from "./controller/controller";

export default function Header() {

    const controller = useModalHeaderController();
    
    return (
        <DialogTitle>
            <Typography variant="h6">{controller.title}</Typography>
            <Typography variant="body1">{controller.description}</Typography>
        </DialogTitle>
    )
}