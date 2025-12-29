"use client";

import { Grid, Box, Theme, SxProps } from "@mui/material";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import DBSizeProgressBar from "./DBSizeProgressBar/DBSizeProgressBar";
import QuickActionsGrid from "./QuickActionsGrid/QuickActionsGrid";
import ReportsGrid from "./ReportsGrid/ReportsGrid";
import BussinessInfoCard from "./BussinessInfoCard/BussinessInfoCard";

export default function DashboardPage() {

    return (
        <Box sx={styles.container}>
            <Grid container spacing={3}>
                <Grid container size={{ xs: 12, md: 8 }}>
                    <WelcomeMessage />
                    <DBSizeProgressBar />
                    <QuickActionsGrid />
                    <ReportsGrid />
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
