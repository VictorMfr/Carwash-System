import type columns from "@/types/v2/datagrid/columns/columns";
import { name } from "./fields/name";
import { isTool } from "./fields/isTool";
import { unit } from "./fields/unit";

export const columns: columns[] = [
    name,
    isTool,
    unit,
];
