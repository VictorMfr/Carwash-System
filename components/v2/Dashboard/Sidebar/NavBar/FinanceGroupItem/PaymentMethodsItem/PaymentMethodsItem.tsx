import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Payment } from "@mui/icons-material";

export default function PaymentMethodsItem() {
    return (
        <Link href="/dashboard/finance/method">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Payment />
                </ListItemIcon>
                <ListItemText primary="Métodos de pago" />
            </ListItemButton>
        </Link>
    )
}