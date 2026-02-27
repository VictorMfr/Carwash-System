import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

export default interface menuItem {
    name: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}