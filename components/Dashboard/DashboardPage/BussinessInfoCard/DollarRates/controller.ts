import { useEffect, useState } from "react";

export default function useDollarRatesController() {
    const [dollarRates, setDollarRates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetch('https://ve.dolarapi.com/v1/dolares');
            if (res.ok) {
                const data = await res.json();
                setDollarRates(data);
            }
            setLoading(false);
        }
        load();
    }, []);

    return {
        dollarRates,
        loading
    }
}