import { ZodSchema } from "zod";
import confirmConfig from "./confirmConfig/confirmConfig";
import formDataConfig from "./formDataConfig/formDataConfig";
import config from "./config/config";
import Autocomplete from "@mui/material/Autocomplete";
import { ComponentProps } from "react";

export default interface Autocomplete extends Partial<ComponentProps<typeof Autocomplete>> {
    url: string,
    searchField: string,
    newItemLabel?: string,
    
    queryParams?: Record<string, string | number | boolean>,

    confirm?: confirmConfig,
    formData?: formDataConfig,
    multiple?: boolean,
    
    config?: config,
    
    disableActions?: boolean;
}