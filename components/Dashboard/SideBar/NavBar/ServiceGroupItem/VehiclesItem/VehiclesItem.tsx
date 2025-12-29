import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { DirectionsCar } from "@mui/icons-material";

export default function VehiclesItem() {
    return (
        <Link href="/dashboard/service/vehicle">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <DirectionsCar />
                </ListItemIcon>
                <ListItemText primary="Vehículos" />
            </ListItemButton>
        </Link>
    )
}