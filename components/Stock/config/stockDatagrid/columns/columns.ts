import type columns from "@/types/v2/datagrid/columns/columns";
import { product } from "./fields/product";
import { minimumQuantity } from "./fields/minimumQuantity";
import { total } from "./fields/total";

export const columns: columns[] = [
    product,
    minimumQuantity,
    total,
];
