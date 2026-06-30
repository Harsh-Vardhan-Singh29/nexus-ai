import {
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaFire,
    FaFlag,
} from "react-icons/fa";

import { useTasks } from "../../hooks/useTasks";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

export default function RecentTasks() {

    const { tasks, loading } = useTasks();

    const priorityColor = (priority: string) => {

        switch (priority.toLowerCase()) {

            case "high":
                return "bg-red-500/20 text-red-300 border-red-500/30";

            case "medium":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

            default:
                return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";

        }

    };

    return (

        <GlassCard className="p-8">

            <div className="flex items-center justify-between mb-8">

                <SectionHeader
                    title="Recent Tasks"
                    subtitle="AI prioritized task list"
                    icon={<FaTasks />}
                />

                <span className="rounded-xl bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

                    {tasks.length} Tasks

                </span>

            </div>

            {/* AI Recommendation */}

            {!loading && tasks.length > 0 && (

                <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

                    <div className="flex items-center gap-3">

                        <FaFire className="text-cyan-400" />

                        <h3 className="font-semibold text-white">

                            AI Recommendation

                        </h3>

                    </div>

                    <p className="mt-3 text-slate-300">

                        Complete your highest-priority task first to build
                        momentum and maximize today's productivity.

                    </p>

                </div>

            )}

            {loading ? (

                <div className="flex h-60 items-center justify-center text-slate-400">

                    Loading recent tasks...

                </div>

            ) : tasks.length === 0 ? (

                <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-slate-500">

                    No recent tasks available.

                </div>

            ) : (

                <div className="space-y-5">

                    {tasks.slice(0, 5).map((task) => (

                        <div
                            key={task.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
                        >

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex-1">

                                    <h3 className="text-lg font-semibold text-white">

                                        {task.title}

                                    </h3>

                                    <p className="mt-2 text-sm text-slate-400">

                                        {task.description || "No description available"}

                                    </p>

                                </div>

                                <div className="flex flex-wrap gap-3">

                                    <span
                                        className={`rounded-full border px-4 py-2 text-xs font-medium ${priorityColor(
                                            task.priority
                                        )}`}
                                    >

                                        <FaFlag className="mr-2 inline" />

                                        {task.priority}

                                    </span>

                                    <span
                                        className={`rounded-full px-4 py-2 text-xs font-medium ${
                                            task.status === "Completed"
                                                ? "bg-green-500/20 text-green-300"
                                                : "bg-yellow-500/20 text-yellow-300"
                                        }`}
                                    >

                                        {task.status === "Completed" ? (
                                            <FaCheckCircle className="mr-2 inline" />
                                        ) : (
                                            <FaClock className="mr-2 inline" />
                                        )}

                                        {task.status}

                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </GlassCard>

    );

}