import columns from "@/types/v2/datagrid/columns/columns";
import { operators } from "./operators";
import { recipe } from "./recipe";

export const fields: columns[] = [
    operators,
    recipe
];
