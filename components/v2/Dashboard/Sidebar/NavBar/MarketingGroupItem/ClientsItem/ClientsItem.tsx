import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Group } from "@mui/icons-material";
import Link from "next/link";

export default function ClientsItem() {
    return (
        <Link href="/dashboard/marketing">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItemButton>
        </Link>
    )
}