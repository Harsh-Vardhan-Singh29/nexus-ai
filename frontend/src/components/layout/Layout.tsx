import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useReminder } from "../../hooks/useReminder";
import { useNotifications } from "../../context/NotificationContext";
export default function Layout() {
    const { addNotification } = useNotifications();

    useReminder(addNotification);
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-white">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Area */}

            <div className="relative flex flex-1 flex-col overflow-hidden">

                {/* Background Glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_35%)]
                    "
                />

                {/* Navbar */}

                <Navbar />

                {/* Page Content */}

                <main
                    className="
                        relative
                        flex-1
                        overflow-y-auto
                        px-8
                        py-6
                        scrollbar-thin
                        scrollbar-track-slate-900
                        scrollbar-thumb-slate-700
                    "
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
}