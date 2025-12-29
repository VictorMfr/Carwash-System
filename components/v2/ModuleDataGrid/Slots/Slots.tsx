import { GridSlotsComponent } from "@mui/x-data-grid";
import Toolbar from "./Toolbar/Toolbar";

export default function Slots() {
    const slots: Partial<GridSlotsComponent> | undefined = {
        toolbar: Toolbar
    };

    return slots;
}