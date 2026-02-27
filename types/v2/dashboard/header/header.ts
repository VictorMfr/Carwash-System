import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UIDisplayControlsContextType } from "@/hooks/UIDisplayControlsProvider";

export interface header {
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    title?: string;
    subtitle?: string;
    actions?: {
        name: string;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
        goTo?: string;
        onClick?: (router: AppRouterInstance, uiContext: UIDisplayControlsContextType) => void;
    }[];
}