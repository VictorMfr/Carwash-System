import actions from "@/types/v2/datagrid/actions/actions";

export default function useModalHeaderController(action: actions['options'][number]) {
    
    const title = action.name;
    const description = action.description;

    return {
        title,
        description,
    }
}