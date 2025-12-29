import { Card, CardHeader, CardContent, Stack, Box, Chip, Divider, Theme, SxProps } from "@mui/material";
import dayjs from "dayjs";
import DollarRates from "./DollarRates/DollarRates";
import RecentNotifications from "./RecentNotifications/RecentNotifications";

export default function BussinessInfoCard() {

    return (
        <Card variant="outlined" sx={styles.infoCard}>
            <CardHeader
                title="Información de la empresa"
                sx={styles.cardHeader}
            />
            <CardContent>
                <Stack spacing={2}>
                    <Box sx={styles.dateChipContainer}>
                        <Chip
                            label={dayjs().format('DD/MM/YYYY')}
                            size="small"
                            sx={styles.dateChip}
                        />
                    </Box>
                    <Stack spacing={2}>
                        <DollarRates />
                        <Divider />
                        <RecentNotifications />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    infoCard: {
        borderRadius: 2,
        height: 'fit-content',
        position: 'sticky',
        top: 24,
    },
    cardHeader: {
        pb: 1
    },
    dateChipContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 1,
    },
    dateChip: {
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 500,
    },
}