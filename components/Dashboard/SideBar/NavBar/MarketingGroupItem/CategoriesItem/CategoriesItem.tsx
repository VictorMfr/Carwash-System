import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Category } from "@mui/icons-material";

export default function CategoriesItem() {
    return (
        <Link href="/dashboard/marketing/category">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Category />
                </ListItemIcon>
                <ListItemText primary="Categorías" />
            </ListItemButton>
        </Link>
    )
}