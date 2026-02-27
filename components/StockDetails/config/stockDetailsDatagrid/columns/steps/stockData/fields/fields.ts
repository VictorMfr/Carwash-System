import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { quantity } from "./quantity";
import { entryDate } from "./entryDate";
import { brand } from "./brand";
import { state } from "./state";

export const fields: formVanilla[] = [
    quantity,
    entryDate,
    brand,
    state,
]