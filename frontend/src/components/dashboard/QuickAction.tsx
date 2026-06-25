import {
    FaPlus,
    FaRobot,
    FaCalendarAlt,
    FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "New Task",
            subtitle: "Create a task",
            icon: <FaPlus size={22} />,
            color: "from-blue-500 to-cyan-500",
            action: () => navigate("/tasks"),
        },
        {
            title: "AI Assistant",
            subtitle: "Ask Gemini",
            icon: <FaRobot size={22} />,
            color: "from-violet-500 to-purple-600",
            action: () => navigate("/ai"),
        },
        {
            title: "Planner",
            subtitle: "Open calendar",
            icon: <FaCalendarAlt size={22} />,
            color: "from-emerald-500 to-green-600",
            action: () => navigate("/planner"),
        },
        {
            title: "Analytics",
            subtitle: "View dashboard",
            icon: <FaChartLine size={22} />,
            color: "from-orange-500 to-red-500",
            action: () => navigate("/"),
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">

            <div className="mb-6">

                <h2 className="text-xl font-bold text-white">
                    Quick Actions
                </h2>

                <p className="text-sm text-slate-400">
                    Jump to your most-used features
                </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                {actions.map((item) => (

                    <button
                        key={item.title}
                        type="button"
                        onClick={item.action}
                        className="
                            group
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800/60
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-500
                            hover:shadow-lg
                            hover:shadow-blue-500/10
                        "
                    >

                        <div
                            className={`
                                mb-5
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                ${item.color}
                                text-white
                            `}
                        >
                            {item.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            {item.subtitle}
                        </p>

                    </button>

                ))}

            </div>

        </div>
    );
}