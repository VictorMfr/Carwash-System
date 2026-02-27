import { Fragment } from "react";
import HeaderIndex from "./Header";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import { Container, SxProps, Theme } from "@mui/material";
import { useDashboardContext } from "./context";

export default function Dashboard({ children }: { children: React.ReactNode }) {

    const { settings } = useDashboardContext();

    return (
        <Fragment>
            <HeaderIndex settings={settings.header} />
            <Stack direction={'row'}>
                <Sidebar settings={settings.sidebar} />
                <Container sx={styles.container}>
                    {children}
                </Container>
            </Stack>
        </Fragment>
    );
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        paddingTop: 8,
        paddingBottom: 8,
        height: '90vh',
        overflowY: 'scroll',
    },
}