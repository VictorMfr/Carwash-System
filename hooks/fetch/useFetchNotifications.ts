import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchNotifications(context?: any) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    const fetchNotifications = async () => {
        try {
            setLoadingNotifications(true);
            const response = await api.get('/api/notification');

            if (context) {
                context.setNotifications(response.data);
                context.setLoadingNotifications(false);
            } else {
                setNotifications(response.data);
                setLoadingNotifications(false);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setLoadingNotifications(false);
            if (context) {
                context.setLoadingNotifications(false);
            }
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return { notifications, loadingNotifications, setNotifications };
}
