import useVerticalStepperController from "./controller";
import { Stepper, Step, StepLabel, StepContent as MuiStepContent, Stack } from "@mui/material";
import ModuleForm from "../../../..";
import StepperActions from "../../StepperActions/StepperActions";
import { Fragment } from "react";

export default function VerticalStepper() {

    const controller = useVerticalStepperController();

    return (
        <Fragment>
            <Stepper
                activeStep={controller.controls.stepper.activeStep}
                orientation={'vertical'}
            >
                {controller.settings.steps.map((step) => (
                    <Step key={step.title}>
                        <StepLabel>{step.title}</StepLabel>
                        <MuiStepContent>
                            <Stack direction="column" spacing={2}>
                                <ModuleForm
                                    settings={{
                                        config: step.config,
                                        contentType: controller.contentType,
                                        fields: step.fields,
                                    }}
                                    controls={controller.controls}
                                />
                                <StepperActions />
                            </Stack>
                        </MuiStepContent>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}