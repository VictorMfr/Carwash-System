import { GridBaseProps } from "@mui/material";
import stepperStep from "./stepperStep/stepperStep";

export default interface formStepper {
    title: string;
    orientation?: 'horizontal' | 'vertical';
    config?: GridBaseProps;
	steps: stepperStep[];
}