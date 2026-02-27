import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { CartInputProvider } from "./context";
import CartInput from "./CartInput";

export default function CartInputIndex({ field }: { field: formVanilla }) {
    return (
        <CartInputProvider field={field}>
            <CartInput />
        </CartInputProvider>
    );
}