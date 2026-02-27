import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import Link from "next/link";

export default function VehicleBrandsItem() {
    return (
        <Link href="/dashboard/service/vehicle/brand">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <BusinessCenter />
                </ListItemIcon>
                <ListItemText primary="Marcas de vehículos" />
            </ListItemButton>
        </Link>
    )
}