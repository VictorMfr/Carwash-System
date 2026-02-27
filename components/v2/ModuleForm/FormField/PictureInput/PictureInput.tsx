import { Stack } from "@mui/material";
import DroppableInput from "./DroppableInput/DroppableInput";
import ButtonInput from "./ButtonInput/ButtonInput";
import Modal from "./Modal/Modal";
import usePictureInputController from "./controller";

export default function PictureInput() {

    const controller = usePictureInputController();

    if (!controller.field.picture) return null;

    return (
        <Stack gap={2}>
            <DroppableInput/>
            <ButtonInput/>
            <Modal/>
        </Stack >
    );
}