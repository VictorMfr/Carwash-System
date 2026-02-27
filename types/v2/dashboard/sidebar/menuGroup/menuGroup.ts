import menuItem from "../menuGroup/menuItem/menuItem";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import menuDivider from "../menuGroup/menuDivider/menuDivider";
import { Home } from "@mui/icons-material";

export default interface menuGroup {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    groupName: string;
    items: (menuItem | menuGroup | menuDivider)[];
}