import columns from "@/types/v2/datagrid/columns/columns";
import type { stepperColumns } from "@/types/v2/datagrid/datagrid";

export default function getFilteredColumns(
  cols: columns[] | stepperColumns,
  mode: "add" | "edit"
): columns[] | stepperColumns {
  const filterFn = (column: columns) =>
    mode === "add" ? !column.createHidden : !column.updateHidden;

  if (Array.isArray(cols)) {
    return cols.filter(filterFn);
  }

  return {
    ...cols,
    steps: cols.steps.map(step => ({
      ...step,
      fields: (step.fields ?? []).filter(filterFn),
    })),
  };
}