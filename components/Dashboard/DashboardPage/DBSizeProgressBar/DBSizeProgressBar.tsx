import { Fragment } from "react";
import useDBSizeProgressBarController from "./controller";
import { CardContent, Grid, Stack, Typography, Card, Avatar, LinearProgress, Skeleton, Theme, SxProps } from "@mui/material";
import { Storage } from "@mui/icons-material";


export default function DBSizeProgressBar() {
    const { dbMeta, loadingDbMeta } = useDBSizeProgressBarController();
    const usedMb = dbMeta?.[0]?.tamaño_mb ?? 0;
    const progressValue = Math.min((usedMb / 500) * 100, 100);
    const showProgressSkeleton = loadingDbMeta || !dbMeta;
    const progressVariant = showProgressSkeleton ? 'indeterminate' : 'determinate';

    return (
        <Fragment>
            <Grid size={12}>
                <Card variant="outlined" sx={styles.storageCard}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar sx={styles.storageIcon}>
                                    <Storage />
                                </Avatar>
                                <Stack>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Almacenamiento disponible
                                    </Typography>
                                    <Typography variant="h6" sx={styles.storageTitle}>
                                        {dbMeta ? `${usedMb} MB / 500 MB` : ` ... / 500 MB`}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <LinearProgress
                                variant={progressVariant}
                                value={progressValue}
                                sx={styles.progress}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    storageCard: {
        borderRadius: 2,
    },
    storageIcon: {
        width: 48,
        height: 48,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
    },
    progress: {
        borderRadius: 5,
    },
    progressSkeleton: {
        borderRadius: 5,
    },
}