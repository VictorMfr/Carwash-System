import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";

export default function useCreateController() {

    const { settings } = useModuleDataGridContext();

    const showAddModal = () => {
        
    }

    return {
        create: true,
    }
}