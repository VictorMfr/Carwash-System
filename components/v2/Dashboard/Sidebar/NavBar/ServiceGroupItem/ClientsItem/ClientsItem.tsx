import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Group } from "@mui/icons-material";

export default function ClientsItem() {
    return (
        <Link href="/dashboard/client">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItemButton>
        </Link>
    )
}