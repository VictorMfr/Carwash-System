import type columns from "@/types/v2/datagrid/columns/columns";
import { name } from "./fields/name";
import { balance } from "./fields/balance";

export const columns: columns[] = [
    name,
    balance,
]