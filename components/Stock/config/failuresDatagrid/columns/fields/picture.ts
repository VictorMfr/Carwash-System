import PictureCell from "@/components/ModuleDataGrid/PictureCell";
import columns from "@/types/v2/datagrid/columns/columns";

export const picture: columns = {
    id: 'picture',
    field: 'picture',
    headerName: 'Imagen',
    size: 12,
    flex: 1,
    renderCell: PictureCell,
    createHidden: true,
    updateHidden: true
};