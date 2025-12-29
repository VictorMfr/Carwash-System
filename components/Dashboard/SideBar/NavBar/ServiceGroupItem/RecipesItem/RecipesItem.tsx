import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { MenuBook } from "@mui/icons-material";

export default function RecipesItem() {
    return (
        <Link href="/dashboard/service/recipe">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <MenuBook />
                </ListItemIcon>
                <ListItemText primary="Recetas" />
            </ListItemButton>
        </Link>
    )
}