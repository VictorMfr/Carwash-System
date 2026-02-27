import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Crop } from "react-image-crop";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import useGetFieldController from "../utils/useGetFieldController";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

interface PictureInputContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    crop: Crop | undefined;
    setCrop: Dispatch<SetStateAction<Crop | undefined>>;
    completedCrop: Crop | undefined;
    setCompletedCrop: (completedCrop: Crop | undefined) => void;
    field: formVanilla;
    previewUrl: string | undefined;
    setPreviewUrl: Dispatch<SetStateAction<string | undefined>>;
    imgSrc: string;
    setImgSrc: Dispatch<SetStateAction<string>>;
    fieldController: formStateField;
    aspectRatio: number;
    cropWidth: number;
    cropHeight: number;
}

const PictureInputContext = createContext<PictureInputContextType>({
    open: false,
    setOpen: () => { },
    previewUrl: undefined,
    setPreviewUrl: () => { },
    crop: undefined,
    setCrop: () => { },
    completedCrop: undefined,
    setCompletedCrop: () => { },
    field: {} as formVanilla,
    imgSrc: '',
    setImgSrc: () => { },
    fieldController: { field: '', value: '', error: '' },
    aspectRatio: 1,
    cropWidth: 90,
    cropHeight: 90,
});

export function usePictureInputContext() {
    return useContext(PictureInputContext);
}

const defaultCrop: Crop = {
    width: 50,
    height: 50,
    unit: 'px',
    x: 0,
    y: 0,
}

export function PictureInputProvider({
    children,
    field
}: {
    children: React.ReactNode,
    field: formVanilla
}) {


    const aspectRatio = 1;
    const cropWidth = 90;
    const cropHeight = 90;

    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState<Crop | undefined>(defaultCrop);
    const [imgSrc, setImgSrc] = useState('');

    const fieldController = useGetFieldController(field);




    const data = {
        open,
        setOpen,
        crop,
        setCrop,
        completedCrop: undefined,
        setCompletedCrop: () => { },
        field,
        previewUrl,
        setPreviewUrl,
        imgSrc,
        setImgSrc,
        fieldController: fieldController.state,
        aspectRatio,
        cropWidth,
        cropHeight,
    }

    return (
        <PictureInputContext.Provider value={data}>
            {children}
        </PictureInputContext.Provider>
    );
}
