import columns from "@/types/v2/datagrid/columns/columns";

export default function filterColumns(columns: columns[]) {
    return columns.filter((column) => !column.columnHidden);
}