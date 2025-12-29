import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ProductionQuantityLimits } from "@mui/icons-material";
import Link from "next/link";

export default function ProductsItem() {
    return (
        <Link href="/dashboard/stock/product">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <ProductionQuantityLimits />
                </ListItemIcon>
                <ListItemText primary="Productos" />
            </ListItemButton>
        </Link>
    )
}