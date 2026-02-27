import type columns from "@/types/v2/datagrid/columns/columns";
import { date } from "./fields/date";
import { amount } from "./fields/amount";
import { description } from "./fields/description";
import { auto } from "./fields/auto";
import { dollarRate } from "./fields/dollarRate";
import { account } from "./fields/account";
import { method } from "./fields/method";

export const columns: columns[] = [
    date,
    amount,
    description,
    auto,
    dollarRate,
    account,
    method,
]