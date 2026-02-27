import useTitlesController from "./controller";
import { Stack, Typography } from "@mui/material";

export default function Titles() {

    const controller = useTitlesController();

    
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {controller.icon && <controller.icon />}
            <Stack spacing={-1}>
                <Typography variant="h6" sx={{ margin: 0 }}>{controller.title}</Typography>
                <Typography variant="caption" sx={{ margin: 0 }}>{controller.subtitle}</Typography>
            </Stack>
        </Stack>
    )
}