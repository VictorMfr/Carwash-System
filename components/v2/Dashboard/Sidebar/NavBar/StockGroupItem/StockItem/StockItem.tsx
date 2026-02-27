import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Inventory } from "@mui/icons-material";

export default function StockItem() {
    return (
        <Link href="/dashboard/stock">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Inventory />
                </ListItemIcon>
                <ListItemText primary="Inventario" />
            </ListItemButton>
        </Link>
    )
}