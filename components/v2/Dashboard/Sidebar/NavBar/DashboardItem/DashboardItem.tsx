import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Home } from "@mui/icons-material";

export default function DashboardItem() {

    return (
        <Link href="/dashboard">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
            </ListItemButton>
        </Link>
    )
}