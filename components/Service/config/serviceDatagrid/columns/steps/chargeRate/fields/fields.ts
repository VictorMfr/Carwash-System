import columns from "@/types/v2/datagrid/columns/columns";
import { chargeSwitch } from "./chargeSwitch";
import { bolCharge } from "./bolCharge";
import { rateSwitch } from "./rateSwitch";
import { dollarRate } from "./dollarRate";
import { status } from "./status";

export const fields: columns[] = [
    chargeSwitch,
    rateSwitch,
    bolCharge,
    dollarRate,
    status
];
