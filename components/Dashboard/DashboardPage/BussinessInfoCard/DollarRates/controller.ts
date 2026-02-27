import { useEffect, useState } from "react";

export default function useDollarRatesController() {
    const [dollarRates, setDollarRates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (res.ok) {
                    const data = await res.json();
                    setDollarRates(data);
                }
            } catch {
                setLoading(false);
            }
        }
        load();
    }, []);

    return {
        dollarRates,
        loading
    }
}