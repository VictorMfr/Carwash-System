import { usePictureInputContext } from "../../context";

export default function useHeaderController() {
    const { field } = usePictureInputContext();

    return {
        title: field.picture?.title,
        description: field.picture?.description,
    }
}