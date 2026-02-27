import form from "@/types/v2/form/form";
import { stepper } from "./stepper/stepper";

export const stockQuickFormSettings: form = {
    config: { spacing: 2 },
    contentType: 'application/json',
    fields: stepper
}