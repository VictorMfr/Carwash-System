import { Avatar, Grid, Stack, Typography, Card, CardActionArea, Box, alpha, CardContent, Link, Theme, SxProps } from "@mui/material";
import { Fragment } from "react";
import BoltIcon from '@mui/icons-material/Bolt';
import useQuickActionsGridController from "./controller";

export default function QuickActionsGrid() {

    const controller = useQuickActionsGridController();

    return (
        <Fragment>
            <Grid size={12}>
                <Stack direction="row" spacing={2} alignItems="center" sx={styles.sectionHeader}>
                    <Avatar sx={styles.sectionIconAvatar}>
                        <BoltIcon sx={styles.sectionIcon} />
                    </Avatar>
                    <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                        Acciones rápidas
                    </Typography>
                </Stack>
            </Grid>
            {controller.quickActions.map((action, idx) => {
                const IconComponent = action.icon;
                return (
                    <Grid size={{ xs: 12, md: 6 }} key={idx}>
                        <Card variant="outlined" sx={styles.actionCard}>
                            <CardActionArea component={Link} href={action.href} sx={styles.cardAction}>
                                <CardContent sx={styles.cardContent}>
                                    <Stack spacing={2}>
                                        <Box sx={styles.iconContainer}>
                                            <Avatar sx={{
                                                ...styles.actionIcon,
                                                bgcolor: alpha(action.color, 0.1),
                                                color: action.color
                                            }}>
                                                <IconComponent />
                                            </Avatar>
                                        </Box>
                                        <Stack spacing={0.5}>
                                            <Typography variant="h6" component="h3" sx={styles.cardTitle}>
                                                {action.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={styles.cardDescription}>
                                                {action.description}
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