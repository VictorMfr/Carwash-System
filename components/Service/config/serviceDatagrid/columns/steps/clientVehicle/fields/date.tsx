import columns from "@/types/v2/datagrid/columns/columns";
import { Fragment } from "react";
import dayjs from "dayjs";

export const date: columns = {
    id: 'date',
    field: 'date',
    headerName: 'Fecha',
    size: 12,
    flex: 1,
    date: {},
    renderCell: (params: any) => (
        <Fragment>
            {params.row.date !== null && params.row.date !== undefined
                ? dayjs(params.row.date).format('DD/MM/YYYY')
                : ''}
        </Fragment>
    ),
};
