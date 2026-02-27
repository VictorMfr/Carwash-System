import { useActionItemContext } from "../../context";

export default function useModalContentController() {

    const { params, action } = useActionItemContext();


    return {
        params,
        action,
    };
}