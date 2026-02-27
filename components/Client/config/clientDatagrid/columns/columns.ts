import type columns from "@/types/v2/datagrid/columns/columns";
import { name } from "./fields/name";
import { lastname } from "./fields/lastname";
import { phone } from "./fields/phone";
import { vehicles } from "./fields/vehicles";

export const columns: columns[] = [
    name,
    lastname,
    phone,  
    vehicles,
];
