import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import ModuleForm from "../../..";
import useStepContentController from "./controller";

export default function StepContent({ step, index }: { step: stepperStep, index: number }) {

    const controller = useStepContentController(step, index);

    if (!controller.isActiveStep) return null;

    return (
        <ModuleForm
            settings={controller.form}
            controls={controller.controls}
        />
    );
}