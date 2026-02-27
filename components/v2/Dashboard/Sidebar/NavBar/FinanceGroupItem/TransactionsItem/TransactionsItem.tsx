import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { AttachMoney } from "@mui/icons-material";

export default function TransactionsItem() {
    return (
        <Link href="/dashboard/finance">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Transacciones" />
            </ListItemButton>
        </Link>
    )
}