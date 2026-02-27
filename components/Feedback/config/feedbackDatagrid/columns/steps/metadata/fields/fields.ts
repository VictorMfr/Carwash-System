import columns from "@/types/v2/datagrid/columns/columns";
import { client } from "./client";
import { opinionType } from "./opinionType";
import { category } from "./category";

export const fields: columns[] = [
    client,
    opinionType,
    category,
];
