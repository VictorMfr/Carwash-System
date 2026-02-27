import PictureCell from "@/components/ModuleDataGrid/PictureCell";
import columns from "@/types/v2/datagrid/columns/columns";

export const pictureField: columns = {
    id: 'picture',
    field: 'picture',
    headerName: 'Imagen',
    size: 6,
    picture: {},
    renderCell: PictureCell,
};