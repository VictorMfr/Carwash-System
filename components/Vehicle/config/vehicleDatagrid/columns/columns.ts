import type columns from "@/types/v2/datagrid/columns/columns";
import { license_plate } from "./fields/license_plate";
import { brand } from "./fields/brand";
import { model } from "./fields/model";
import { client } from "./fields/client";

export const columns: columns[] = [
    license_plate,
    brand,
    model,
    client,
];
