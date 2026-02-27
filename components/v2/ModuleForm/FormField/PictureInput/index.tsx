import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { PictureInputProvider } from "./context";
import PictureInput from "./PictureInput";

export default function PictureInputIndex({ field }: { field: formVanilla }) {
    return (
        <PictureInputProvider field={field}>
            <PictureInput/>
        </PictureInputProvider>
    );
}