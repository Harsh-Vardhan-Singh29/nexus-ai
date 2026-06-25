import {
    FaBell,
    FaRobot,
    FaSearch,
    FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

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

            <div className="hidden w-[420px] lg:block">

                <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">

                    <FaSearch className="mr-3 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search tasks, planner or AI..."
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />

                </div>

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

                <button
                    type="button"
                    aria-label="Notifications"
                    title="Notifications"
                    className="
                        rounded-xl
                        bg-slate-900
                        p-3
                        text-slate-300
                        transition-all
                        hover:bg-slate-800
                        hover:text-white
                    "
                >
                    <FaBell size={18} />
                </button>

                {/* Avatar */}

                <button
                    type="button"
                    aria-label="User Profile"
                    title="User Profile"
                    className="
                        rounded-full
                        bg-gradient-to-br
                        from-blue-500
                        to-purple-600
                        p-2
                        text-white
                    "
                >
                    <FaUserCircle size={30} />
                </button>
            </div>

        </header>
    );
}