import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import columns from "./columns/columns";
import formStepper from "../form/formVariants/formStepper/formStepper";
import stepperStep from "../form/formVariants/formStepper/stepperStep/stepperStep";
import actions from "./actions/actions";
import config from "./config/config";

export default interface datagrid {
    url: string;
    title: string;
    description: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
    columns: columns[] | formStepper & { steps: (stepperStep & { fields: columns[] })[] };
    actions?: actions;
    config?: config;
}