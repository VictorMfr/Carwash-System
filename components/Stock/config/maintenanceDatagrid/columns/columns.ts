import type columns from "@/types/v2/datagrid/columns/columns";
import { picture } from "./fields/picture";
import { name } from "./fields/name";
import { brand } from "./fields/brand";
import { state } from "./fields/state";

export const columns: columns[] = [
    picture,
    name,
    brand,
    state,
];
