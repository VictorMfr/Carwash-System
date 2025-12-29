import { ZodSchema } from "zod";

export default interface operation {
    name?: string;
    description?: string;
    hiddenAction?: boolean;
    validation?: ZodSchema<any>;
    contentType?: 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
}