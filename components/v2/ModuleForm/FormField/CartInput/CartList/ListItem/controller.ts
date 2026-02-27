import { useCartInputContext } from "../../context";
import { GridSize } from "@mui/material";

export default function useListItemController() {
    const cartCtx = useCartInputContext();

    const fieldSize = cartCtx.field.size;

    const smallGridSize = { xs: 12, lg: 6 };
    const largeGridSize = { xs: 12, sm: 6, md: 4, lg: 3 };


    let gridSize;

    if (fieldSize === 12) gridSize = largeGridSize;
    else gridSize = smallGridSize;

    return {
        gridSize,
    }
}