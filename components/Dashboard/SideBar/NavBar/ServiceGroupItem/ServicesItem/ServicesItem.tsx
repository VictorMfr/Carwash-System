import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { LocalCarWash } from "@mui/icons-material";
import Link from "next/link";

export default function ServicesItem() {
    return (
        <Link href="/dashboard/service">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <LocalCarWash />
                </ListItemIcon>
                <ListItemText primary="Operaciones" />
            </ListItemButton>
        </Link>
    )
}