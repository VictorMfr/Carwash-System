import { useCartInputContext } from "../../../context";
import { useModuleFormContext } from "../../../../../context";

export default function useDeleteActionController(itemId: string) {
    const cartCtx = useCartInputContext();
    const { controls } = useModuleFormContext();

    const deleteItemHandler = () => {
        const next = cartCtx.cart.filter(item => item.product.id !== itemId);
        cartCtx.setCart(next);
        controls.setFormState(states => (
            states.map(state => (
                state.field === cartCtx.field.field
                    ? { ...state, value: next, error: state.error ?? '' }
                    : state
            ))
        ));
    }

    return {
        deleteItemHandler,
    }
}