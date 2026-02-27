import { useEffect, useState } from "react";
import getDollarRate from "@/lib/dollar";


interface DollarRate {
    fuente: string;
    nombre: string;
    compra: number;
    venta: number;
    promedio: number;
    fechaActualizacion: string;
}

export default function useFetchDollarRate() {
    const [dollarRate, setDollarRate] = useState<DollarRate[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDollarRate = async () => {
        try {
            setLoading(true);
            const rate = await getDollarRate();
            setDollarRate(rate);
        } catch {
            console.log('Error consultando a la API, compruebe la conexion a internet')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDollarRate();
    }, []);

    return { dollarRate, loading };
}