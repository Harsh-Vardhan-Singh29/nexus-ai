import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export interface AppNotification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

interface NotificationContextType {
    notifications: AppNotification[];
    unreadCount: number;
    addNotification: (
        title: string,
        message: string
    ) => void;
    markAllRead: () => void;
}

const NotificationContext =
    createContext({} as NotificationContextType);

export function NotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [notifications, setNotifications] =
        useState<AppNotification[]>(() => {

            const saved =
                localStorage.getItem(
                    "notifications"
                );

            return saved ? JSON.parse(saved) : [];

        });

    useEffect(() => {

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

    }, [notifications]);

    function addNotification(
        title: string,
        message: string
    ) {

        setNotifications((prev) => [

            {
                id: Date.now(),
                title,
                message,
                time: new Date().toLocaleTimeString(),
                read: false,
            },

            ...prev,

        ]);

    }

    function markAllRead() {

        setNotifications((prev) =>
            prev.map((n) => ({
                ...n,
                read: true,
            }))
        );

    }

    const unreadCount = notifications.filter(
        (n) => !n.read
    ).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAllRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );

}

export function useNotifications() {
    return useContext(NotificationContext);
}