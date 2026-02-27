// Toma la configuracion y lo hace disponible para el componente y sus hijos
import useFetch from "@/hooks/fetch/useFetch";
import datagrid from "@/types/v2/datagrid/datagrid";
import modal from "@/types/v2/datagrid/modal/modal";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { createContext, SetStateAction, Dispatch, useContext, useState } from "react";

/**
 * Interfaz para el contexto de la grilla.
 */
export interface ModuleDataGridContextType {
    settings: datagrid;
    modalState: modal;
    setModalState: Dispatch<SetStateAction<modal>>;
    fetchData: any[];
    fetchLoading: boolean;
    setFetchData: Dispatch<SetStateAction<any[]>>;
    refetch: () => Promise<void>;
    rowsSelected: GridRowSelectionModel;
    setRowsSelected: Dispatch<SetStateAction<GridRowSelectionModel>>;
}

/**
 * Estado inicial del modal. Esto es solo una constante
 */
const initialModalState: modal = { open: false, type: 'add', data: undefined };

/**
 * Contexto de la grilla formalizado en un createContext usando la interfaz ModuleDataGridContextType.
 */
export const ModuleDataGridContext = createContext<ModuleDataGridContextType>({
    settings: {} as datagrid,
    modalState: initialModalState,
    setModalState: () => {},
    fetchData: [],
    fetchLoading: false,
    setFetchData: () => {},
    refetch: async () => {},
    rowsSelected: {} as GridRowSelectionModel,
    setRowsSelected: () => {},
});


/**
 * Hook para que otros componentes puedan usar el contexto de la grilla.
 */
export function useModuleDataGridContext() {
    const context = useContext(ModuleDataGridContext);
    if (!context) {
        throw new Error('useDataGridContext must be used within a DataGridContext');
    }
    return context;
}

/**
 * Componente que provee el contexto de la grilla a sus hijos cuando es renderizado.
 */
export default function ModuleDataGridProvider({ children, settings }: { children: React.ReactNode, settings: datagrid }) {
    const [modalState, setModalState] = useState<modal>(initialModalState);
    const { data: fetchData, loading: fetchLoading, setData: setFetchData, fetchData: refetch } = useFetch(settings.url);
    const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

    const data = {
        settings, 
        modalState, 
        setModalState,
        fetchData,
        fetchLoading,
        setFetchData,
        refetch,
        rowsSelected,
        setRowsSelected
    };
    
    return (
        <ModuleDataGridContext.Provider value={data}>
            {children}
        </ModuleDataGridContext.Provider>
    );
}
