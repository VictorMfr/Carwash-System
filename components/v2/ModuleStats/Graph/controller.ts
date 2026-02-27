import api from "@/lib/axios";
import { useModuleStatsContext } from "../context";
import { useEffect, useState } from "react";

export default function useGraphController() {
    const context = useModuleStatsContext();
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await api.get(context.settings.url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {
        tab: context.tab,
        settings: context.settings,
        data,
        loading,
    }
}