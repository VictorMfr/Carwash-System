import { Stack, Typography, List, ListItem, ListItemText, ListItemIcon, Avatar, Theme, SxProps } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import useRecentNotificationsController from "./controller";

export default function RecentNotifications() {

    const controller = useRecentNotificationsController();

    return (
        <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
                <NotificationsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant="subtitle2" color="text.secondary">
                    Últimas notificaciones
                </Typography>
            </Stack>
            <List dense disablePadding>
                {controller.notifications.length > 0 ? (
                    controller.notifications.map((n: any) => (
                        <ListItem key={n.id} disableGutters sx={styles.listItem}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={styles.listIcon}>
                                    <NotificationsIcon sx={{ fontSize: 18 }} />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={styles.listPrimary}>
                                        {n.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="text.secondary">
                                        {n.subtitle}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem disableGutters>
                        <ListItemText
                            primary={
                                <Typography variant="body2" color="text.secondary">
                                    Sin notificaciones recientes.
                                </Typography>
                            }
                        />
                    </ListItem>
                )}
            </List>
        </Stack>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    listItem: {
        py: 1,
    },
    listIcon: {
        width: 32,
        height: 32,
        bgcolor: 'action.hover',
        color: 'text.secondary',
    },
}