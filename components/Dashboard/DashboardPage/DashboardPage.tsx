"use client";

import { Grid, Box, Theme, SxProps } from "@mui/material";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import DBSizeProgressBar from "./DBSizeProgressBar/DBSizeProgressBar";
import QuickActionsGrid from "./QuickActionsGrid/QuickActionsGrid";
import ReportsGrid from "./ReportsGrid/ReportsGrid";
import BussinessInfoCard from "./BussinessInfoCard/BussinessInfoCard";
import useUserPermissions from "../hooks/useUserPermissions";

export default function DashboardPage() {
    const { permissions } = useUserPermissions();

    return (
        <Box sx={styles.container}>
            <Grid container spacing={3}>
                <Grid container size={{ xs: 12, md: 8 }} alignItems="flex-start" justifyContent="flex-start" display={"flex"} flexDirection={"column"} gap={2}>
                    <WelcomeMessage />
                    <DBSizeProgressBar />
                    <QuickActionsGrid permissions={permissions} />
                    <ReportsGrid permissions={permissions} />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <BussinessInfoCard />
                </Grid>
            </Grid>
        </Box>
    );
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        p: { xs: 2, md: 3 },
    }
}
