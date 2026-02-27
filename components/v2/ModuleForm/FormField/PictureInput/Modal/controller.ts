import { canvasPreview } from "@/components/ModuleForm/Inputs/Picture/Crop/canvasPreview";
import { usePictureInputContext } from "../context";
import { useRef, useState } from "react";
import { useDebounceEffect } from "./Crop/useDebounceEffect";
import { PixelCrop } from "react-image-crop";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import { useModuleFormContext } from "../../../context";

export default function useModalController() {

    const { setOpen, open, previewUrl, setCrop, crop, imgSrc, setImgSrc, field, aspectRatio, cropWidth, cropHeight } = usePictureInputContext();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(50);
    const [rotate, setRotate] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const moduleFormContext = useModuleFormContext();

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }

        // The preview canvas already contains the cropped result rendered by canvasPreview.
        const blob = await new Promise<Blob>((resolve, reject) => {
            previewCanvas.toBlob((b) => {
                if (b) return resolve(b)
                reject(new Error('Failed to create blob from canvas'))
            }, 'image/png')
        })

        return blob;
    }

    const uploadPicture = async () => {
        const blob = await onDownloadCropClick();
        moduleFormContext.controls.setFormState(moduleFormContext.controls.formState.map(state => state.field === field.id ? { ...state, value: blob } : state));
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const centerAspectCrop = (
        mediaWidth: number,
        mediaHeight: number,
        aspect: number,
    ) => {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: 'px',
                    width: cropWidth,
                    height: cropHeight,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspectRatio))
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    (scale + 50) * 0.01,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    );

    const effects = field.effects;

    return {
        uploadPicture,
        handleClose,
        open,
        previewUrl,
        imgSrc,
        setImgSrc,
        scale,
        setScale,
        rotate,
        setRotate,
        imgRef,
        onImageLoad,
        crop,
        setCrop,
        completedCrop,
        setCompletedCrop,
        previewCanvasRef,
        aspectRatio,
        effects
    }
}