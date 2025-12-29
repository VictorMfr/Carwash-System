import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { AssignmentInd } from "@mui/icons-material";

export default function RolesItem() {
    return (
        <Link href="/dashboard/roles">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <AssignmentInd />
                </ListItemIcon>
                <ListItemText primary="Roles" />
            </ListItemButton>
        </Link>
    )
}