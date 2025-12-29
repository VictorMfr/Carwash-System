// Toma la configuracion y lo hace disponible para el componente y sus hijos
import datagrid from "@/types/v2/datagrid/datagrid";
import modal from "@/types/v2/datagrid/modal/modal";
import { createContext, SetStateAction, Dispatch, useContext, useState } from "react";

export interface ModuleDataGridContextType {
    settings: datagrid;
    modalState: modal;
    setModalState: Dispatch<SetStateAction<modal>>;
}

const initialModalState: modal = { open: false, type: 'add', data: null };

export const ModuleDataGridContext = createContext<ModuleDataGridContextType>({
    settings: {} as datagrid,
    modalState: initialModalState,
    setModalState: () => {},
});


export function useModuleDataGridContext() {
    const context = useContext(ModuleDataGridContext);
    if (!context) {
        throw new Error('useDataGridContext must be used within a DataGridContext');
    }
    return context;
}

export default function ModuleDataGridProvider({ children, settings }: { children: React.ReactNode, settings: datagrid }) {
    const [modalState, setModalState] = useState<modal>(initialModalState);
    
    const data = {
        settings, 
        modalState, 
        setModalState
    };
    
    return (
        <ModuleDataGridContext.Provider value={data}>
            {children}
        </ModuleDataGridContext.Provider>
    );
}
