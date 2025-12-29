import { useModuleDataGridContext } from "@/components/v2/ModuleDataGrid/context";

export default function useDownloadController() {
    
    const { settings } = useModuleDataGridContext();

    const downloadOptions = {
        fileName: settings.title ?? 'Reporte',
    }

    return {
        downloadOptions,
    }
}