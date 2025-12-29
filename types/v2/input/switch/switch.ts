import SwitchSwapRule from "./swapRule/swapRule";
import SwitchDisableRule from "./disableRule/disableRule";
import { SwitchProps } from "@mui/material";

export default interface Switch extends Omit<SwitchProps, 'value' | 'onChange'> {
	disableIds?: SwitchDisableRule[];
	swapIds?: SwitchSwapRule[];
}