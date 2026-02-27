import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { inventoryField } from "./inventory/inventory";
import { quantityField } from "./quantity/quantity";
import { entryDateField } from "./entryDate/entryDate";
import { brandField } from "./brand/brand";
import { stateField } from "./state/state";

export const stepperStockFields: formVanilla[] = [
    inventoryField,
    quantityField,
    entryDateField,
    brandField,
    stateField,
];