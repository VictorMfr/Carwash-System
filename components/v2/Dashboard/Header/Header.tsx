import { AppBar, Stack, Toolbar } from "@mui/material";
import useHeaderController from "./controller";
import Menu from "./Menu/Menu";
import Titles from "./Titles/Titles";
import Actions from "./Actions/Actions";

export default function Header() {

    const controller = useHeaderController();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    width="100%"
                >
                    <Menu/>
                    <Titles/>
                    <Actions/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}