import ActionItem from "./ActionItem";
import { ActionItemProvider } from "./context";
import { GridRenderCellParams } from "@mui/x-data-grid";
import actions from "@/types/v2/datagrid/actions/actions";

export default function ActionItemIndex({ 
    params,
    action
}: { 
    action: actions['options'][number],
    params: GridRenderCellParams 
}) {
    return (
        <ActionItemProvider params={params} action={action}>
            <ActionItem />
        </ActionItemProvider>
    );
}