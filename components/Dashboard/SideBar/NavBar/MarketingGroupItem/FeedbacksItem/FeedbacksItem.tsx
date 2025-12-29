import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Feedback } from "@mui/icons-material";

export default function FeedbacksItem() {
    return (
        <Link href="/dashboard/marketing/feedback">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Feedback />
                </ListItemIcon>
                <ListItemText primary="Comentarios" />
            </ListItemButton>
        </Link>
    )
}