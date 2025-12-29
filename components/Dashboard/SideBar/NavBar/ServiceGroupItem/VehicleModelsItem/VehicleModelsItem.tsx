import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ModelTraining } from "@mui/icons-material";
import Link from "next/link";

export default function VehicleModelsItem() {
    return (
        <Link href="/dashboard/service/vehicle/model">
            <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                <ListItemIcon>
                    <ModelTraining />
                </ListItemIcon>
                <ListItemText primary="Modelos" />
            </ListItemButton>
        </Link>
    )
}