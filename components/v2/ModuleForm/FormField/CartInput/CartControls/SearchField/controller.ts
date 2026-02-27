import { useCartInputContext } from "../../context";
import { useMemo, useState } from "react";
import getUrlWithQuery from "@/components/v2/ModuleForm/FormField/AutocompleteInput/controller/utils/getUrlWithQuery";
import useFetch from "@/hooks/fetch/useFetch";
import AutocompleteConfig from "@/types/v2/input/autocomplete/autocomplete";
import getOptionLabelFunc from "@/components/v2/ModuleForm/FormField/AutocompleteInput/controller/utils/getOptionLabelFunc";
import getFilterOptionsHandler from "@/components/v2/ModuleForm/FormField/AutocompleteInput/controller/utils/getFilterOptionsHandler";

import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import React from "react";
import Cart from "@/types/v2/input/cart/cart";

const pick = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]) =>
    Object.fromEntries(keys.map(key => [key, obj[key]])) as Pick<T, K>;

export default function useSearchFieldController() {
    const cartCtx = useCartInputContext();

    const cartAutocomplete = cartCtx.field.cart?.autocomplete;
    if (!cartAutocomplete) return null;

    const { data, loading } = useFetch<any[]>(cartCtx.field.cart?.autocomplete?.url ?? "");

    const [inputValue, setInputValue] = useState("");

    const allowedProps: (keyof AutocompleteConfig)[] = [
        "autoComplete",
        "clearOnBlur",
        "disableClearable",
        "disabled",
        "freeSolo",
        "groupBy",
        "isOptionEqualToValue",
        "multiple",
        "openOnFocus",
        "renderOption",
        "noOptionsText",
        "loadingText",
    ];

    const getOptionLabel = (option: any) => {
        return option[cartCtx.field.cart?.autocomplete?.searchField ?? 'name'];
    };

    const filterOptionsHandler = getFilterOptionsHandler(cartCtx.field.cart as any);

    const safeProps = cartAutocomplete? pick(cartAutocomplete, allowedProps): {};

    return {
        data,
        loading,
        value: cartCtx.item.product,
        inputValue,
        safeProps,
        onInputChange: (event: any, newInputValue: string, reason: any) => {
            setInputValue(newInputValue);
            cartAutocomplete.onInputChange?.(event, newInputValue, reason);
        },
        onChange: (event: any, newValue: any, reason: any, details: any) => {
            cartCtx.setItem({
                product: newValue,
                quantity: cartCtx.item.quantity,
            });
        },
        getOptionLabel,
        filterOptionsHandler,
        renderInput: cartAutocomplete.renderInput ?? ((params: AutocompleteRenderInputParams) => (
            React.createElement(TextField, {
                ...params,
                fullWidth: true,
                size: "small",
                label: cartCtx.field.headerName ?? "Producto",
            })
        )),
    }
}