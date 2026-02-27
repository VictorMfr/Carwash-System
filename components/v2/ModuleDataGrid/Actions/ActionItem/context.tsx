import { createContext, useContext } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import actions from "@/types/v2/datagrid/actions/actions";

interface ActionItemContextType {
    params: GridRenderCellParams;
    action: actions['options'][number];
}

const ActionItemContext = createContext<ActionItemContextType>({
    params: {} as GridRenderCellParams,
    action: {} as actions['options'][number],
});

export function useActionItemContext() {
    return useContext(ActionItemContext);
}


export function ActionItemProvider({ 
    children, 
    params, 
    action 
}: { 
    children: React.ReactNode, 
    params: GridRenderCellParams, 
    action: actions['options'][number] 
}) {
    

    const data = {
        params,
        action,
    };

    return (
        <ActionItemContext.Provider value={data}>
            {children}
        </ActionItemContext.Provider>
    );
}