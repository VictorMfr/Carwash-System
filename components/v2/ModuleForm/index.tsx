import form from "@/types/v2/form/form";
import ModuleFormContextProvider from "./context";
import Form from "./Form";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";

export default function ModuleForm({ 
    settings,
    controls,
}: { 
    settings: form,
    controls: vanillaFormStateControls | stepperFormStateControls;
}) {
    return (
        <ModuleFormContextProvider
            settings={settings}
            controls={controls}
        >
            <Form />
        </ModuleFormContextProvider>
    );
}