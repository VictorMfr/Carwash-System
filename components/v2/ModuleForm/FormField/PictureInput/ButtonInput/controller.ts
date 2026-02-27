import { usePictureInputContext } from "../context";

export default function useButtonInputController() {
    const { previewUrl, field, setOpen, setCrop, setImgSrc, fieldController } = usePictureInputContext();

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setOpen(true)
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const effects = field.effects;
    
    return {
        field,
        previewUrl,
        onSelectFile,
        effects,
        error: fieldController.error,
    }
}