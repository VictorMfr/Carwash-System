import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import useMobileActionsController from "./controller";
import { MoreVert } from "@mui/icons-material";
import Link from "next/link";

export default function MobileActions() {

    const controller = useMobileActionsController();

    if (!controller.actions) return <></>;

    return (
        <Stack direction="row" alignItems="center">
            <IconButton onClick={controller.handleOpen}>
                <MoreVert sx={{ color: 'white' }} />
            </IconButton>
            <Menu
                open={controller.isOpen}
                onClose={controller.handleClose}
                anchorEl={controller.anchorEl}
            >
                {controller.actions.map((action) => (
                    <Link href={action.goTo ?? ''} key={action.name}>
                        <MenuItem key={action.name} onClick={() => {
                            controller.handleClose();
                            action.onClick?.(controller.router, controller.uiContext);
                        }}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <action.icon color="action" />
                                <Typography>{action.name}</Typography>
                            </Stack>
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Stack >
    )
}