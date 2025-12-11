'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { NotificationProvider, useNotificationContext } from "./ContextProvider";
import NotificationPage from "./NotificationPage/NotificationPage";
import useFetchNotifications from "@/hooks/fetch/useFetchNotifications";

// Inner component that uses the context to fetch notifications
const NotificationContent = () => {
    const notificationsContext = useNotificationContext();
    
    // Ensure notifications are fetched when component mounts
    useFetchNotifications(notificationsContext);
    
    return <NotificationPage />;
};

const NotificationIndex = () => {
    return (
        <NotificationProvider>
            <NotificationContent />
        </NotificationProvider>
    )
}

export default withUIDisplayControls(NotificationIndex);
