import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Assessment } from "@mui/icons-material";

export default function StatesItem() {
    return (
        <Link href="/dashboard/stock/state">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Assessment />
                </ListItemIcon>
                <ListItemText primary="Estados" />
            </ListItemButton>
        </Link>
    )
}