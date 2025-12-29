import { ZodSchema } from "zod";
import formConfig from "../../../formConfig/formConfig";
import formVanilla from "../../formVanilla/formVanilla";

export default interface stepperStep {
	title: string;
	description: string;
	config: formConfig;
	fields: formVanilla[];
	validation?: ZodSchema<any>;
}