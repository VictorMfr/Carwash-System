import { AppBar, DialogTitle, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import useModalHeaderController from "./controller/controller";
import CloseIcon from '@mui/icons-material/Close';

export default function Header() {

    const controller = useModalHeaderController();

    return (

        <AppBar position="static" elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle>
                {controller.title}
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{controller.description}</Typography>
            </DialogTitle>

            <DialogTitle>
                <Tooltip title="Cerrar">
                    <IconButton onClick={controller.closeModalHandler}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                    </Tooltip>
                </DialogTitle>
            </Stack>
        </AppBar >
    )
}