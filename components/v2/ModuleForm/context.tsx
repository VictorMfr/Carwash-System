import form from "@/types/v2/form/form";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import stepperFormStateControls from "@/types/v2/form/controller/formStateStepper/formStateStepper";
import vanillaFormStateControls from "@/types/v2/form/controller/controller";
import { useEffect, useState } from "react";
import formEffectsField from "@/types/v2/form/controller/formEffectsField/formEffectsField";
import getInitialFormEffectsState from "./utils/getInitialFormEffectsState";
import getNewFormState from "./utils/getFormState/getNewFormState";

export interface ModuleFormContextType {
    settings: form;
    unMutableSettings: form;
    setSettings: Dispatch<SetStateAction<form>>;
    controls: vanillaFormStateControls | stepperFormStateControls;
    formEffects: formEffectsField[];
    setFormEffects: Dispatch<SetStateAction<formEffectsField[]>>;
}

const ModuleFormContext = createContext<ModuleFormContextType>({
    settings: {} as form,
    unMutableSettings: {} as form,
    setSettings: () => {},
    controls: {} as vanillaFormStateControls | stepperFormStateControls,
    formEffects: [],
    setFormEffects: () => {},
});

export function useModuleFormContext() {
    const context = useContext(ModuleFormContext);
    if (!context) {
        throw new Error('useModuleFormContext must be used within a ModuleFormContext');
    }
    return context;
}



export default function ModuleFormContextProvider({ 
    children, 
    settings,
    controls,
}: { 
    children: React.ReactNode, 
    settings: form,
    controls: vanillaFormStateControls | stepperFormStateControls,
}) {

    const initialFormEffects = getInitialFormEffectsState(settings);
    const [settingsState, setSettingsState] = useState<form>(settings);
    const [formEffects, setFormEffects] = useState<formEffectsField[]>(initialFormEffects);
    
    const data = {
        settings: settingsState,
        setSettings: setSettingsState,
        controls,
        formEffects,
        setFormEffects,
        unMutableSettings: settings,
    }
    
    return (
        <ModuleFormContext.Provider value={data}>
            {children}
        </ModuleFormContext.Provider>
    )
}