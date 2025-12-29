'use client';

import { DashboardProvider } from "./context";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { Container, Stack, Theme, SxProps } from "@mui/material";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

const DashboardIndex = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardProvider>
            <Header />
            <Stack direction={'row'}>
                <SideBar />
                <Container sx={styles.container}>
                    {children}
                </Container>
            </Stack>
        </DashboardProvider>
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

export default withUIDisplayControls(DashboardIndex);