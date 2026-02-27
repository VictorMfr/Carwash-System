import { createContext, SetStateAction, Dispatch, useContext, useState } from "react";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export interface CartItem {
    product: any;
    quantity: number;
}

export interface CartInputContextType {
    field: formVanilla;
    cart: CartItem[];
    item: CartItem;
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    setItem: Dispatch<SetStateAction<CartItem>>;
}

const CartInputContext = createContext<CartInputContextType>({
    field: {} as formVanilla,
    cart: [],
    item: {
        product: null,
        quantity: 0,
    },
    setCart: () => { return; },
    setItem: () => { return; },
});

export const useCartInputContext = () => useContext(CartInputContext);

export function CartInputProvider({ 
    children,
    field
}: { 
    children: React.ReactNode,
    field: formVanilla;
}) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [item, setItem] = useState<CartItem>({
        product: null,
        quantity: 0,
    });

    const data= {
        field,
        cart,
        item,
        setCart,
        setItem,
    }

    return (
        <CartInputContext.Provider value={data}>
            {children}
        </CartInputContext.Provider>
    );
}