import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { People } from "@mui/icons-material";

export default function UsersItem() {
    return (
        <Link href="/dashboard/users">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItemButton>
        </Link>
    )
}