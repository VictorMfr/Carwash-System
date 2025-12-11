'use client';

import { useState } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import PaymentsTab from "./tabs/PaymentsTab";
import MarketingTab from "./tabs/MarketingTab";
import FinanceTab from "./tabs/FinanceTab";

const SettingsPage = () => {
    const [tab, setTab] = useState<"payments" | "marketing" | "finance">("payments");

    return (
        <Stack spacing={3}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                    aria-label="Tabs de configuración"
                >
                    <Tab value="payments" label="Pagos" />
                    <Tab value="marketing" label="Marketing" />
                    <Tab value="finance" label="Finanzas" />
                </Tabs>
            </Box>

            {tab === "payments" && <PaymentsTab />}
            {tab === "marketing" && <MarketingTab />}
            {tab === "finance" && <FinanceTab />}
        </Stack>
    );
};

export default SettingsPage;