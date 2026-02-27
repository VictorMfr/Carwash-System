import type columns from "@/types/v2/datagrid/columns/columns";
import { stockDetail } from "./fields/stockDetail";
import { description } from "./fields/description";
import { resolved } from "./fields/resolved";
import { picture } from "./fields/picture";

export const columns: columns[] = [
    stockDetail,
    description,
    resolved,
    picture,
];
