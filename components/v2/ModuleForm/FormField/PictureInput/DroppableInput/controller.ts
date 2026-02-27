import { usePictureInputContext } from "../context";

export default function useDroppableInputController() {
    const { field, setOpen, setCrop, setImgSrc, previewUrl, cropWidth, cropHeight } = usePictureInputContext();

    const onDropFile = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        const files = e.dataTransfer?.files
        if (files && files.length > 0) {
            setOpen(true)
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(files[0])
        }
    }

    return {
        field,
        previewUrl,
        onDropFile,
        setOpen,
        cropWidth,
        cropHeight,
    }
}