import { useState } from "react";
import { useActionItemContext } from "./context";
import actions from "@/types/v2/datagrid/actions/actions";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

function isLinkFunction(
    render: actions['options'][number]['render'],
    params: GridRenderCellParams
): render is (params: GridRenderCellParams) => string {
    try {
        const result = (render as (params: GridRenderCellParams) => string)(params);
        return typeof result === 'string';
    } catch {
        return false;
    }
}

export default function useActionItemController() {
    
    const { action, params } = useActionItemContext();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();


    const handleClick = () => {
        try {
            const result = (action.render as (params: GridRenderCellParams) => string)(params);

            if (isLinkFunction(action.render, params)) {
                router.push(result);
            } else {
                setIsOpen(true);
            }
        } catch (error) {
            setIsOpen(true);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    
    return {
        action,
        params,
        isOpen,
        handleClick,
        handleClose
    }
}