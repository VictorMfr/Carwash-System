import { Stack, Typography } from "@mui/material";
import useHeaderController from "./controller";

export default function Header() {

    const controller = useHeaderController();

    return (
        <Stack>
            <Typography variant='h6'>{controller.title}</Typography>
            <Typography variant='body1'>{controller.description}</Typography>
        </Stack>
    );
}