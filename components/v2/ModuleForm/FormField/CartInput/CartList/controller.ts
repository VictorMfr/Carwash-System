import { useCartInputContext } from "../context";

export default function useCartListController() {

    const cartCtx = useCartInputContext();

    return {
        cart: cartCtx.cart,
    }
}