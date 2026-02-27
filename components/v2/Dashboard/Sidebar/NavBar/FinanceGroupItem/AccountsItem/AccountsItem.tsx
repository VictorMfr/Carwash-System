import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { AccountBalance } from "@mui/icons-material";

export default function AccountsItem() {
    return (
        <Link href="/dashboard/finance/account">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <AccountBalance />
                </ListItemIcon>
                <ListItemText primary="Cuentas" />
            </ListItemButton>
        </Link>
    )
}