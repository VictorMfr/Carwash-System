import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Engineering } from "@mui/icons-material";
import Link from "next/link";

export default function OperatorsItem() {
    return (
        <Link href="/dashboard/service/operator">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Engineering />
                </ListItemIcon>
                <ListItemText primary="Operadores" />
            </ListItemButton>
        </Link>
    )
}