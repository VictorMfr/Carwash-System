import { useState } from "react";

export default function useMarketingGroupController() {
    const [marketingOpen, setMarketingOpen] = useState(false);

    const handleMarketingClick = () => {
        setMarketingOpen(!marketingOpen);
    };

    return {
        marketingOpen,
        handleMarketingClick,
    }
}