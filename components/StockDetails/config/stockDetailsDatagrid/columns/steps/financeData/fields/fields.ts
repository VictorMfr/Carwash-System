import { chargeSwitch } from "./chargeSwitch";
import { rateSwitch } from "./rateSwitch";
import { bolCharge } from "./bolCharge";
import { dollarRate } from "./dollarRate";
import { chargeAccount } from "./chargeAccount";
import { method } from "./method";
import columns from "@/types/v2/datagrid/columns/columns";

export const fields: columns[] = [
    chargeSwitch,
    rateSwitch,
    bolCharge,
    dollarRate,
    chargeAccount,
    method,
]