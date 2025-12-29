import formStateField from "./formStateField/formStateField";
import { Dispatch, SetStateAction } from "react";

export default interface vanillaFormStateControls {
    formState: formStateField[];
    setFormState: Dispatch<SetStateAction<formStateField[]>>;
}