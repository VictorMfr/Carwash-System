import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Business } from "@mui/icons-material";

export default function BrandsItem() {
    return (
        <Link href="/dashboard/stock/brand">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Business />
                </ListItemIcon>
                <ListItemText primary="Marcas" />
            </ListItemButton>
        </Link>
    )
}