import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaTasks,
    FaCalendarAlt,
    FaChartLine,
    FaRobot,
    FaCog,
    FaBolt,
} from "react-icons/fa";

const links = [

    {
        name: "Dashboard",
        path: "/",
        icon: <FaHome />,
    },

    {
        name: "Tasks",
        path: "/tasks",
        icon: <FaTasks />,
    },

    {
        name: "Planner",
        path: "/planner",
        icon: <FaCalendarAlt />,
    },

    {
        name: "Calendar",
        path: "/calendar",
        icon: <FaCalendarAlt />,
    },
    
    {
        name: "Analytics",
        path: "/analytics",
        icon: <FaChartLine />,
    },

    {
        name: "AI Assistant",
        path: "/ai",
        icon: <FaRobot />,
    },

    {
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
    },

];

export default function Sidebar() {

    return (

        <aside
            className="
                flex
                h-screen
                w-72
                flex-col
                border-r
                border-slate-800
                bg-slate-950
                text-white
            "
        >

            {/* Logo */}

            <div className="border-b border-slate-800 p-8">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-500
                            via-cyan-500
                            to-purple-600
                            text-xl
                            shadow-lg
                        "
                    >

                        <FaBolt />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-wide">
                            NEXUS AI
                        </h1>

                        <p className="text-xs text-slate-400">
                            AI Productivity Suite
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-3 p-5">

                {links.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-4
                            rounded-xl
                            px-5
                            py-4
                            font-medium
                            transition-all
                            duration-300
                            ${
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }
                        `
                        }
                    >

                        <span className="text-lg">

                            {item.icon}

                        </span>

                        {item.name}

                    </NavLink>

                ))}

            </nav>

            {/* Footer */}

            <div className="border-t border-slate-800 p-6">

                <div className="rounded-xl bg-slate-900 p-4">

                    <p className="text-xs uppercase tracking-widest text-slate-500">

                        Project

                    </p>

                    <h3 className="mt-2 font-semibold">

                        NEXUS AI

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                        Hackathon Edition

                    </p>

                </div>

            </div>

        </aside>

    );

}