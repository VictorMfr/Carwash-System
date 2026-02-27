import { IconButton, Link, Stack, Tooltip } from "@mui/material";
import useDesktopActionsController from "./controller";

export default function DesktopActions() {

    const controller = useDesktopActionsController();

    if (!controller.actions) return <></>;

    return (
        <Stack direction="row" alignItems="center">
            {controller.actions.map((action) => (
                <Link key={action.name}>
                    <Tooltip key={action.name} title={action.name}>
                        <IconButton key={action.name} onClick={() => {
                            action.onClick?.(controller.router, controller.uiContext);
                        }}>
                            <action.icon sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>
                </Link>
            ))}
        </Stack>
    )
}