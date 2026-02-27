import { useCartInputContext } from "../../context";

export default function useQuantityFieldController() {
    const cartCtx = useCartInputContext();

    const changeQuantityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        
        cartCtx.setItem({
            ...cartCtx.item,
            quantity: value,
        });
    }

    return {
        value: cartCtx.item.quantity,
        error: cartCtx.item.quantity < 0 ? "No se puede introducir numeros negativos" : "",
        changeQuantityHandler,
    }
}