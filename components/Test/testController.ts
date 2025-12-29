import { useState } from "react";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function useTestController() {
    const [formState, setFormState] = useState<formStateField[]>([]);

    return {
        formState,
        setFormState,
    }
}