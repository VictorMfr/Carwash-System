import { AppBar, DialogTitle, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Header({
    title,
    description,
    onClose,
}: {
    title: string;
    description: string;
    onClose: () => void;
}) {
    return (
        <AppBar position="static" elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <DialogTitle>
                    {title}
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>{description}</Typography>
                </DialogTitle>
                <DialogTitle>
                    <Tooltip title="Cerrar">
                        <IconButton onClick={onClose}>
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
            </Stack>
        </AppBar>
    )
}