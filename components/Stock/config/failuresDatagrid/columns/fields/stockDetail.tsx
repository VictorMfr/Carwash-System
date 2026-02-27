import columns from "@/types/v2/datagrid/columns/columns";
import PictureCartItem from "@/components/ModuleForm/Inputs/Cart/PictureCartItem";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const stockDetail: columns = {
    id: 'stockDetail',
    field: 'stockDetail',
    headerName: 'Producto',
    size: 12,
    updateHidden: true,
    renderCell: (params: GridRenderCellParams) => params.value?.name ?? '',
    autocomplete: {
        url: '/api/maintenance/tools',
        searchField: 'name',
        renderOption: (props: any, option: any) => {
            const { key, ...optionProps } = props;
            return (
                <li key={`${option.id}-${option.name}`} {...optionProps}>
                    <PictureCartItem option={option} />
                </li>
            );
        },
    },
};
