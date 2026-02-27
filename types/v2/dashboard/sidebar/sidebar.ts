import menuGroup from "./menuGroup/menuGroup";
import menuItem from "./menuGroup/menuItem/menuItem";
import menuDivider from "./menuGroup/menuDivider/menuDivider";

export default interface sidebar {
    navbar: (menuItem | menuGroup | menuDivider)[];
}