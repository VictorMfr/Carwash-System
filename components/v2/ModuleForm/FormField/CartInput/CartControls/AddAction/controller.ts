import { useCartInputContext } from "../../context";
import { useModuleFormContext } from "../../../../context";

export default function useAddActionController() {
    const cartCtx = useCartInputContext();
    const { controls } = useModuleFormContext();

    const addItemHandler = () => {
        if (!cartCtx.item.product) return;
        if (cartCtx.item.quantity < 0) return;

        // Si el producto ya existe en el carrito, se incrementa la cantidad en el carrito
        const current = cartCtx.cart;
        const existingItem = current.find(item => item.product.id === cartCtx.item.product.id);
        const next = existingItem
            ? current.map(item => item.product.id === cartCtx.item.product.id ? { ...item, quantity: item.quantity + cartCtx.item.quantity } : item)
            : [...current, cartCtx.item];

        cartCtx.setCart(next);
        controls.setFormState(states => (
            states.map(state => (
                state.field === cartCtx.field.field
                    ? { ...state, value: next, error: state.error ?? '' }
                    : state
            ))
        ));

        // Se limpia el item
        cartCtx.setItem({
            product: null,
            quantity: 0,
        });
    }

    return {
        addItemHandler,
    }
}