import { useState } from "react";

export default function useStockGroupController() {

    const [inventoryOpen, setInventoryOpen] = useState(false);

    const handleInventoryClick = () => {
        setInventoryOpen(!inventoryOpen);
    };

    return {
        inventoryOpen,
        handleInventoryClick,
    }
}