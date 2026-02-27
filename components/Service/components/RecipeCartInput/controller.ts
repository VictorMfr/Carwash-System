import useFetch from "@/hooks/fetch/useFetch";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { useEffect, useMemo, useState } from "react";
import { createFilterOptions } from "@mui/material";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { CartItem } from "@/components/v2/ModuleForm/FormField/CartInput/context";
import { useModuleFormContext } from "@/components/v2/ModuleForm/context";

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

export default function useRecipeCartInputController(field?: formVanilla): ControllerState {
    if (!field) {
        return {
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
        };
    }

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

    useEffect(() => {
        if (!selectedRecipe?.id) return;
        const fetchLastConfig = async () => {
            try {
                iuCtx.setScreenLoading(true);
                const response = await api.get(`/api/service/recipe/${selectedRecipe.id}/stockDetails`);

                setCart(response.data.map((item: any) => ({
                    product: item.product,
                    quantity: item.quantity,
                    picture: item.product.picture,
                })));

            } catch (error) {
                console.log("recipe_last_config_error", error);
            } finally {
                iuCtx.setScreenLoading(false);
            }
        };
        fetchLastConfig();
    }, [selectedRecipe?.id]);

    const changeSelectedRecipe = (event: any, value: any) => {
        setSelectedRecipe(value ?? null);

        formCtx.controls.setFormState(fields => (
            fields.map(state => (
                state.field === field.id ? { ...state, value: value ? { selectedRecipe: value ?? null, products: [] } : '', error: '' } : state
            ))
        ));
    };

    const changeSelectedProduct = (event: any, value: any) => {
        setSelectedProduct(value ?? null);
    };

    const changeQuantity = (event: any) => {
        setQuantity(Number(event.target.value));
    };

    const addItemToCart = () => {
        if (!selectedProduct) return;
        const nextQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
        const productId = selectedProduct?.id ?? selectedProduct?.value ?? JSON.stringify(selectedProduct);
        const current = Array.isArray(cart) ? cart : [];
        const idx = current.findIndex(item => (
            (item.product?.id ?? item.product?.value ?? JSON.stringify(item.product)) === productId
        ));

        const next = idx >= 0
            ? current.map((item, index) => index === idx
                ? { ...item, quantity: Number(item.quantity) + nextQuantity }
                : item
            )
            : [...current, { product: selectedProduct, quantity: nextQuantity }];

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