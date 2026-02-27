import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Notifications } from "@mui/icons-material";

export default function NotificationsItem() {
    return (
        <Link href="/dashboard/notification">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notificaciones" />
            </ListItemButton>
        </Link>
    )
}