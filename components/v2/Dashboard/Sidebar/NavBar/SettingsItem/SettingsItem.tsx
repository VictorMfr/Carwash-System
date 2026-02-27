import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Settings } from "@mui/icons-material";

export default function SettingsItem() {
    return (
        <Link href="/dashboard/settings">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="Configuración" />
            </ListItemButton>
        </Link>
    )
}