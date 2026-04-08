import useFetch from "@/hooks/fetch/useFetch";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { useEffect, useMemo, useState } from "react";
import { createFilterOptions } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { CartItem } from "@/components/v2/ModuleForm/FormField/CartInput/context";
import { useModuleFormContext } from "@/components/v2/ModuleForm/context";
import { RecipeStockDetailsResponse } from "@/app/api/service/recipe/[id]/stockDetails/route";

const filter = createFilterOptions<any>();

type ControllerState = {
    recipeOptions: any[];
    productOptions: any[];
    selectedRecipe: any;
    selectedProduct: any;
    cart: any[];
    quantity: number;
    loading: boolean;
    isSmallScreen: boolean;
    changeSelectedRecipe: (event: any, value: any) => void;
    changeSelectedProduct: (event: any, value: any) => void;
    setQuantity: (value: number) => void;
    addItemToCart: () => void;
    removeItemFromCart: (itemId: any, index?: number) => void;
    filterOptionsHandler: (options: any[], state: any) => any[];
    getOptionLabel: (option: any) => string;
    changeQuantity: (event: any) => void;
};

const defaultState: ControllerState = {
    recipeOptions: [],
    productOptions: [],
    selectedRecipe: null,
    selectedProduct: null,
    cart: [],
    quantity: 1,
    loading: false,
    isSmallScreen: false,
    changeSelectedRecipe: () => { },
    changeSelectedProduct: () => { },
    setQuantity: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    filterOptionsHandler: (options) => options,
    getOptionLabel: () => "",
    changeQuantity: () => { },
}

export default function useRecipeCartInputController(field?: formVanilla): ControllerState {
    if (!field) return defaultState;

    const recipeUrl = field.autocomplete?.url ?? "/api/service/recipe";
    const productUrl = "/api/stock/details";

    const { data: recipes, loading: recipesLoading } = useFetch(recipeUrl);
    const { data: products, loading: productsLoading } = useFetch(productUrl);

    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [quantity, setQuantity] = useState<number>(0);

    const formCtx = useModuleFormContext();
    const iuCtx = useUIDisplayControls();






















    const changeSelectedRecipe = async (event: any, value: any) => {
        console.log('Receta seleccionada:', value);

        // Si no hay valor, limpiar la receta seleccionada y el estado del formulario
        if (!value) {
            setSelectedRecipe(null);
            formCtx.controls.setFormState(prev => prev.map(state => state.field === field.id ? { field: field.field, value: '', error: '' } : state));
            return;
        }

        setSelectedRecipe(value);

        try {
            iuCtx.setScreenLoading(true);
            const response: { data: RecipeStockDetailsResponse[] } = await api.get(`/api/service/recipe/${value.id}/stockDetails`);

            const products = response.data.map((item: RecipeStockDetailsResponse) => ({
                product: item.product,
                quantity: item.quantity,
                picture: item.product.picture,
            }));

            console.log('VALOR DE PRODUCTS GUARDADOS CON ANTERIORIDAD EN LA RECETA: ', products);

            setCart(products);

            formCtx.controls.setFormState(list => (
                list.map(state => (
                    state.field == field.id ? {
                        field: field.field,
                        value: {
                            selectedRecipe: value,
                            products
                        },
                        error: ''
                    } : state
                ))
            ));
        } catch (error) {
            console.error('Error fetching recipe products:', error);
        } finally {
            iuCtx.setScreenLoading(false);
        }
    };






















    const changeSelectedProduct = (event: any, value: any) => {
        console.log('PRODUCTO SELECCIONADO:', value);
        setSelectedProduct(value ?? null);
    };



















    const changeQuantity = (event: any) => {
        setQuantity(Number(event.target.value));
    };






















    const addItemToCart = () => {
        if (!selectedProduct) return;

        console.log('Producto a añadir al carrito: ', selectedProduct);

        // Si la cantidad es menor o igual a 0, se establece automaticamente en 1
        const nextQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
        const productId = selectedProduct?.id ?? selectedProduct?.value ?? JSON.stringify(selectedProduct);












        

        // Si la cantidad en el carrito no esta disponible, se cancela la operacion
        if (selectedProduct.quantity < nextQuantity) {
            iuCtx.setSnackbar({ open: true, message: 'No hay suficiente stock disponible para agregar esta cantidad.', severity: 'error' });
            return;
        }













        // Es posible que el usuario intente agregar el mismo 
        // producto varias veces, saltandose los limites 
        // de la cantidad disponible. Por eso, se verifica la
        // viabilidad incluso con los productos que ya estan en el carrito, sumando las cantidades
        const existingCartItem = cart.find(item => selectedProduct && item.product?.id === selectedProduct.id);
        
        if (existingCartItem) {
            const totalQuantity = existingCartItem.quantity + nextQuantity;

            if (selectedProduct.quantity < totalQuantity) {
                iuCtx.setSnackbar({ open: true, message: 'No hay suficiente stock disponible para agregar esta cantidad.', severity: 'error' });
                return;
            }
        }


















        // Encontrar el indice dentro del carrito si coincide con el producto seleccionado
        const idx = cart.findIndex(item => (
            (item.product?.id ?? item.product?.value ?? JSON.stringify(item.product)) === productId
        ));






















        // Si el producto ya existe en el carrito, se actualiza la cantidad
        let next = [];
        if (idx >= 0) {
            next = cart.map((item, index) => {
                if (index === idx) {
                    return { ...item, quantity: Number(item.quantity) + nextQuantity };
                }
                return item;
            })
        } else {
            // De lo contrario, se añade el nuevo producto al carrito
            next = [
                ...cart, 
                { 
                    product: {
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        picture: selectedProduct.picture,
                        isTool: selectedProduct.Stock.Product.isTool,
                    }, 
                    quantity: nextQuantity 
                }
            ];
        }



        console.log('VALOR DEL CART ANTES DE AGREGAR:', next);

        setCart(next);
        setSelectedProduct(null);
        setQuantity(0);

        formCtx.controls.setFormState(fields => (
            fields.map(state => (
                state.field === field.id ? { ...state, value: { selectedRecipe, products: next }, error: '' } : state
            ))
        ));
    };





















    const removeItemFromCart = (itemId: any, index?: number) => {
        const current = Array.isArray(cart) ? cart : [];

        const next = current.filter((_, i) => i !== index);

        setCart(next);

        formCtx.controls.setFormState(fields => (
            fields.map(state => (
                state.field === field.id ? { ...state, value: { selectedRecipe, products: next }, error: '' } : state
            ))
        ));
    };



















    const filterOptionsHandler = (options: any[], state: any) => {
        return filter(options, state);
    };
















    const getOptionLabel = useMemo(() => {
        const key = field.autocomplete?.searchField ?? "name";
        return (option: any) => option?.[key] ?? option?.name ?? "";
    }, [field.autocomplete?.searchField]);



















    const isSmallScreen = field.size !== 12;
















    return {
        recipeOptions: Array.isArray(recipes) ? recipes : [],
        productOptions: Array.isArray(products) ? products : [],
        selectedRecipe,
        selectedProduct,
        cart,
        quantity,
        loading: recipesLoading || productsLoading,
        isSmallScreen,
        changeSelectedRecipe,
        changeSelectedProduct,
        setQuantity,
        addItemToCart,
        removeItemFromCart,
        filterOptionsHandler,
        getOptionLabel,
        changeQuantity,
    };
}