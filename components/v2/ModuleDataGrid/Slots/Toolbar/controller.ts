import { useModuleDataGridContext } from "../../context";


const defaultToolbar = {
    isQuickFilterEnabled: true,
    isFilterEnabled: true,
    isExportEnabled: true,
    isDownloadEnabled: true,
    isCreateEnabled: true,
    isBulkDeleteEnabled: true,
}

export default function useToolbarController() {
    
    const { settings } = useModuleDataGridContext();

    if (!settings.config) return defaultToolbar;
    if (!settings.config.toolbar) return defaultToolbar;
    if (!settings.config.toolbar.show) return defaultToolbar;
    

    const toolbarShow = settings.config.toolbar;



    
    return {
        isQuickFilterEnabled: toolbarShow.show?.includes('quickFilter'),
        isFilterEnabled: toolbarShow.show?.includes('filter'),
        isExportEnabled: toolbarShow.show?.includes('export'),
        isDownloadEnabled: toolbarShow.show?.includes('download'),
        isCreateEnabled: toolbarShow.show?.includes('create'),
        isBulkDeleteEnabled: toolbarShow.show?.includes('bulkDelete'),
    };
}