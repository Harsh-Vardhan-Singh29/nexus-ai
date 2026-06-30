import {
    FaBell,
    FaRobot,
    FaSearch,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaHome,
    FaTasks,
    FaChartLine,
} from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );
export default function Navbar() {
    const [showNotifications, setShowNotifications] =
        useState(false);
    const { query, setQuery } = useSearch();
    

    const [showProfile, setShowProfile] =
        useState(false);

    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const {
        notifications,
        unreadCount,
        markAllRead,
    } = useNotifications();
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const quickLinks = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/",
        },
        {
            name: "Tasks",
            icon: "📋",
            path: "/tasks",
        },
        {
            name: "Planner",
            icon: "🗓️",
            path: "/planner",
        },
        {
            name: "Calendar",
            icon: "📅",
            path: "/calendar",
        },
        {
            name: "Analytics",
            icon: "📈",
            path: "/analytics",
        },
        {
            name: "AI Assistant",
            icon: "🤖",
            path: "/ai",
        },
        {
            name: "Settings",
            icon: "⚙️",
            path: "/settings",
        },
    ]
    const filteredLinks = quickLinks.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <header
            className="
                sticky
                top-0
                z-50
                flex
                h-20
                items-center
                justify-between
                border-b
                border-slate-800
                bg-slate-950/80
                px-8
                backdrop-blur-xl
            "
        >
            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-white">
                    NEXUS AI
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    {today}
                </p>

            </div>

            {/* Center */}

            <div className="relative hidden w-[420px] lg:block">

                {/* Search Box */}

                <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">

                    <FaSearch className="mr-3 text-slate-500" />

                    <input
                        type="text"
                        value={query}
                        onFocus={() => setShowSearch(true)}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSearch(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => setShowSearch(false), 200);
                        }}
                        placeholder="Search tasks, pages..."
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />

                </div>

                {/* Search Dropdown */}

                {showSearch && query && (

                    <div
                        className="
                            absolute
                            left-0
                            top-full
                            z-50
                            mt-2
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-900
                            shadow-2xl
                        "
                    >

                        {filteredLinks.length > 0 ? (

                            filteredLinks.map((item) => (

                                <button
                                    key={item.path}
                                    type="button"
                                    onMouseDown={(e) => {

                                        e.preventDefault();

                                        navigate(item.path);

                                        setQuery("");

                                        setShowSearch(false);

                                    }}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        text-left
                                        text-white
                                        hover:bg-slate-800
                                    "
                                >

                                    <span className="text-lg">

                                        {item.icon}

                                    </span>

                                    <span>

                                        {item.name}

                                    </span>

                                </button>

                            ))

                        ) : (

                            <div className="px-4 py-3 text-slate-400">

                                No matching pages

                            </div>

                        )}

                    </div>

                )}

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

                {/* AI Status */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-500/30
                        bg-emerald-500/10
                        px-4
                        py-2
                        text-sm
                        text-emerald-400
                    "
                >
                    <FaRobot />
                    AI Ready
                </div>

                {/* Notification */}

                <div className="relative">

                    <button
                        onClick={() =>
                            setShowNotifications(
                                !showNotifications
                            )
                        }
                        type="button"
                        title="Notifications"
                        aria-label="Notifications"
                        className="
                            relative
                            rounded-xl
                            bg-slate-900
                            p-3
                            text-slate-300
                            hover:bg-slate-800
                        "
                    >

                        <FaBell size={18}/>

                        {unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -right-1
                                    -top-1
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    text-xs
                                    font-bold
                                    text-white
                                "
                            >

                                {unreadCount}

                            </span>

                        )}

                    </button>

                    {showNotifications && (

                        <div
                            className="
                                absolute
                                right-0
                                mt-3
                                w-80
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-900
                                p-5
                                shadow-2xl
                            "
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <h3 className="text-lg font-bold">

                                    Notifications

                                </h3>

                                {notifications.length > 0 && (

                                    <button
                                        onClick={markAllRead}
                                        className="
                                            text-sm
                                            text-cyan-400
                                            hover:text-cyan-300
                                        "
                                    >

                                        Mark all read

                                    </button>

                                )}

                            </div>

                            {notifications.length === 0 ? (

                                <p className="text-slate-400">
                                    No notifications
                                </p>

                            ) : (

                                notifications.map((n) => (

                                    <div
                                        key={n.id}
                                        className={`
                                            mb-4
                                            rounded-xl
                                            p-3
                                            ${
                                                n.read
                                                    ? "bg-slate-900 opacity-70"
                                                    : "bg-slate-800 border border-cyan-500/30"
                                            }
                                        `}
                                    >

                                        <h4 className="font-semibold">

                                            {n.title}

                                        </h4>

                                        <p className="text-sm text-slate-400">

                                            {n.message}

                                        </p>

                                        <p className="mt-2 text-xs text-slate-500">

                                            {n.time}

                                        </p>

                                    </div>

                                ))

                            )}

                        </div>

                    )}

                </div>

                {/* Avatar */}

                <div className="relative">

                    <button
                        type="button"
                        title="User Profile"
                        aria-label="Open user profile"
                        onClick={() =>
                            setShowProfile(
                                !showProfile
                            )
                        }
                        className="
                            rounded-full
                            bg-gradient-to-br
                            from-blue-500
                            to-purple-600
                            p-2
                        "
                    >

                       {user?.picture ? (
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                            />
                        ) : (
                            <FaUserCircle size={30} />
                        )} 

                    </button>

                    {showProfile && (

                        <div
                            className="
                                absolute
                                right-0
                                mt-3
                                w-64
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-900
                                p-5
                            "
                        >

                            <h3 className="font-bold">

                               {user?.name || "Guest User"}

                            </h3>

                            <p className="mb-5 text-sm text-slate-400">

                                {user?.email || "Guest Mode"}

                            </p>

                            <div className="space-y-3">

                                <Link
                                    to="/"
                                    className="flex items-center gap-2 hover:text-cyan-400"
                                >

                                    <FaHome />

                                    Dashboard

                                </Link>

                                <Link
                                    to="/tasks"
                                    className="flex items-center gap-2 hover:text-cyan-400"
                                >

                                    <FaTasks />

                                    Tasks

                                </Link>

                                <Link
                                    to="/analytics"
                                    className="flex items-center gap-2 hover:text-cyan-400"
                                >

                                    <FaChartLine />

                                    Analytics

                                </Link>

                                <Link
                                    to="/settings"
                                    className="flex items-center gap-2 hover:text-cyan-400"
                                >

                                    <FaCog />

                                    Settings

                                </Link>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("user");
                                        localStorage.removeItem("token");

                                        window.location.href = "/login";
                                    }}
                                >

                                    <FaSignOutAlt />

                                    <span>Logout</span>

                                </button>

                            </div>

                        </div>

                    )}

                </div>
            </div>

        </header>
    );
}