import { useState } from "react";

export default function useFinanceGroupController() {
    const [financeOpen, setFinanceOpen] = useState(false);

    const handleFinanceClick = () => {
        setFinanceOpen(!financeOpen);
    };

    return {
        financeOpen,
        handleFinanceClick,
    }
}