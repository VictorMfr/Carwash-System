import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { chargeSwitch } from "./chargeSwitch/chargeSwitch";
import { rateSwitch } from "./rateSwitch/rateSwitch";
import { bolCharge } from "./bolCharge/bolCharge";
import { dollarRate } from "./dollarRate/dollarRate";
import { chargeAccount } from "./chargeAccount/chargeAccount";
import { method } from "./method/method";

export const financeStepFields: formVanilla[] = [
    chargeSwitch,
    rateSwitch,
    bolCharge,
    dollarRate,
    chargeAccount,
    method,
];

