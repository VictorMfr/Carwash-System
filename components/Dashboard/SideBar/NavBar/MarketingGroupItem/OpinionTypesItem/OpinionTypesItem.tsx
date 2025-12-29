import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Assessment } from "@mui/icons-material";
import Link from "next/link";

export default function OpinionTypesItem() {
    return (
        <Link href="/dashboard/marketing/opinionType">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <Assessment />
                </ListItemIcon>
                <ListItemText primary="Tipos de opinión" />
            </ListItemButton>
        </Link>
    )
}