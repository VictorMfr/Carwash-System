import { Fragment } from "react";
import { Grid, Stack, Typography, Avatar, Card, CardActionArea, Box, alpha, CardContent, Link, Theme, SxProps } from "@mui/material";
import BarChart from '@mui/icons-material/BarChart';
import useReportsGridController from "./controller";


export default function ReportsGrid() {

    const controller = useReportsGridController();

    return (
        <Fragment>
            <Grid size={12}>
                <Stack direction="row" spacing={2} alignItems="center" sx={styles.sectionHeader}>
                    <Avatar sx={styles.sectionIconAvatar}>
                        <BarChart sx={styles.sectionIcon} />
                    </Avatar>
                    <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                        Reportes
                    </Typography>
                </Stack>
            </Grid>
            {controller.reports.map((report, idx) => {
                const IconComponent = report.icon;
                return (
                    <Grid size={{ xs: 12, md: 6 }} key={idx}>
                        <Card variant="outlined" sx={styles.actionCard}>
                            <CardActionArea component={Link} href={report.href} sx={styles.cardAction}>
                                <CardContent sx={styles.cardContent}>
                                    <Stack spacing={2}>
                                        <Box sx={styles.iconContainer}>
                                            <Avatar sx={{
                                                ...styles.actionIcon,
                                                bgcolor: alpha(report.color, 0.1),
                                                color: report.color
                                            }}>
                                                <IconComponent />
                                            </Avatar>
                                        </Box>
                                        <Stack spacing={0.5}>
                                            <Typography variant="h6" component="h3" sx={styles.cardTitle}>
                                                {report.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={styles.cardDescription}>
                                                {report.description}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Fragment>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    sectionHeader: {
        mb: 2,
        mt: 1,
    },
    sectionIconAvatar: {
        width: 40,
        height: 40,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
    },
}