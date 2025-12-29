
export default function useExportController() {

    const exportPrintOptions = {
        hideFooter: true,
        hideToolbar: true,
        includeCheckboxes: false,
        pageStyle: 'A4',
    }

    return {
        exportPrintOptions,
    }
}