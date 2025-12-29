import datagrid from "@/types/v2/datagrid/datagrid";

export default function getTitle(type: 'add' | 'edit', settings: datagrid) {
    const createTitle = settings.config?.create?.name;
    const editTitle = settings.config?.edit?.name;
    return type === 'add' ? createTitle : editTitle;
}