import { useEffect } from "react";
import { usePictureInputContext } from "./context";

export default function usePictureInputController() {
    const { field, setPreviewUrl, fieldController } = usePictureInputContext();

    useEffect(() => {
        if (fieldController.value && fieldController.value instanceof Blob) {
            const url = URL.createObjectURL(fieldController.value)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
        if (typeof fieldController.value === 'string' && fieldController.value) {
            setPreviewUrl(fieldController.value)
            return
        }
        setPreviewUrl(undefined)
    }, [fieldController.value])

    return {
        field,
    }
}