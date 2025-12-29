import datagrid from "@/types/v2/datagrid/datagrid";

export default function getDescription(type: 'add' | 'edit', settings: datagrid) {
    const createDescription = settings.config?.create?.description;
    const editDescription = settings.config?.edit?.description;
    return type === 'add' ? createDescription : editDescription;
}