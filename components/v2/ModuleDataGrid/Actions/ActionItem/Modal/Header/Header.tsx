import { AppBar, DialogTitle, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import useModalHeaderController from "./controller";
import CloseIcon from '@mui/icons-material/Close';
import actions from "@/types/v2/datagrid/actions/actions";

export default function Header({ closeHandler, action }: { closeHandler: () => void, action: actions['options'][number] }) {

    const controller = useModalHeaderController(action);

    return (
        <AppBar position="static" elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle>
                {controller.title}
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{controller.description}</Typography>
            </DialogTitle>

            <DialogTitle>
                <Tooltip title="Cerrar">
                    <IconButton onClick={closeHandler}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                    </Tooltip>
                </DialogTitle>
            </Stack>
        </AppBar >
    )
}