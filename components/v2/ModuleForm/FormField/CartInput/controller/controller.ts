import { useCartInputContext } from "../context";

export default function useCartInputController() {
    const cartCtx = useCartInputContext();

    return {
        field: cartCtx.field,
        cartAutocomplete: cartCtx.field.cart?.autocomplete,
    }
}