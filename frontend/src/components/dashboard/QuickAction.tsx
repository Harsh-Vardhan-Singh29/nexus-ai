import {
    FaPlus,
    FaRobot,
    FaCalendarAlt,
    FaChartLine,
    FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

export default function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Create Task",
            subtitle: "Add a new task to your workspace",
            icon: <FaPlus size={24} />,
            color: "from-cyan-500 to-blue-600",
            action: () => navigate("/tasks"),
        },
        {
            title: "AI Assistant",
            subtitle: "Ask NEXUS AI for recommendations",
            icon: <FaRobot size={24} />,
            color: "from-violet-500 to-purple-600",
            action: () => navigate("/ai"),
        },
        {
            title: "Plan My Day",
            subtitle: "Generate an AI-powered daily schedule",
            icon: <FaCalendarAlt size={24} />,
            color: "from-emerald-500 to-green-600",
            action: () => navigate("/planner"),
        },
        {
            title: "Analytics",
            subtitle: "View your productivity insights",
            icon: <FaChartLine size={24} />,
            color: "from-orange-500 to-red-500",
            action: () => navigate("/analytics"),
        },
    ];

    return (
        <GlassCard className="p-8">

            <SectionHeader
                title="AI Quick Actions"
                subtitle="Navigate through your AI workspace"
                icon={<FaRobot />}
            />

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {actions.map((item, index) => (

                    <motion.button
                        key={item.title}
                        type="button"
                        onClick={item.action}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        className="
                            group
                            overflow-hidden
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            p-6
                            text-left
                            transition-all
                            duration-300
                            hover:border-cyan-400/40
                            hover:bg-white/10
                        "
                    >

                        <div
                            className={`
                                mb-6
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                ${item.color}
                                text-white
                                shadow-lg
                            `}
                        >
                            {item.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-white">

                            {item.title}

                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-400">

                            {item.subtitle}

                        </p>

                        <div className="mt-6 flex items-center text-cyan-400 transition-all group-hover:translate-x-1">

                            <span className="text-sm font-medium">

                                Open

                            </span>

                            <FaArrowRight className="ml-2" />

                        </div>

                    </motion.button>

                ))}

            </div>

        </GlassCard>
    );
}