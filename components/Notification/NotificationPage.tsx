'use client';

import { Box, Stack, Typography } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import NotificationModuleSettings from "./config";

export default function NotificationPage() {
    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
                <ModuleDataGrid moduleSettings={NotificationModuleSettings} />
            </Stack>
        </Box>
    );
}