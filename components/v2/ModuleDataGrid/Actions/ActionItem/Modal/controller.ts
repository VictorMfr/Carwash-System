import { useActionItemContext } from "../context";

export default function useModalController() {
    const { action, params } = useActionItemContext();  
    
    return {
        action,
        params,
    }
}