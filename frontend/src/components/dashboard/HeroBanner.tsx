import {
    FaArrowRight,
    FaCheckCircle,
    FaRocket,
    FaTasks,
} from "react-icons/fa";

interface HeroBannerProps {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    overdueTasks: number;
    nextTask?: string;
}
import { useNavigate } from "react-router-dom";
export default function HeroBanner({
    totalTasks,
    completedTasks,
    overdueTasks,
    nextTask,
}: HeroBannerProps) {
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const firstName =
        user?.name?.split(" ")[0] || "Guest";
    const productivity =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-700
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-blue-950
                p-8
                shadow-2xl
            "
        >
            {/* Background Glow */}

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div>

                    <p className="text-sm uppercase tracking-[2px] text-cyan-400">
                        {user?.email || "NEXUS AI"}
                    </p>

                    <h1 className="mt-3 text-5xl font-bold text-white">
                        {greeting}, {firstName} 👋
                    </h1>

                    <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                        Welcome back {firstName}! Your AI workspace is
                        synchronized and ready. Let's complete today's
                        tasks and boost your productivity.

                        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-5">

                            <p className="text-sm font-semibold text-cyan-400">
                                🤖 AI Recommendation
                            </p>

                            <p className="mt-2 text-slate-300">
                                {overdueTasks > 0
                                    ? `You have ${overdueTasks} overdue task${overdueTasks > 1 ? "s" : ""}. Complete them first.`
                                    : nextTask
                                        ? `Start with "${nextTask}" today. It's your next important task.`
                                        : "Great job! No urgent tasks today."}
                            </p>

                        </div>
                    </p>
                    

                    <button
                        type="button"
                        onClick={() => navigate("/tasks")}
                        className="
                            mt-8
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition-all
                            hover:scale-105
                            hover:bg-blue-700
                        "
                    >
                        Continue Working

                        <FaArrowRight />
                    </button>

                </div>

                {/* Right */}

                <div className="grid grid-cols-2 gap-5">

                    <div className="rounded-2xl bg-slate-800/70 p-6 text-center">

                        <FaTasks
                            className="mx-auto text-3xl text-cyan-400"
                        />

                        <h2 className="mt-4 text-4xl font-bold text-white">
                            {totalTasks}
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Total Tasks
                        </p>

                    </div>

                    <div className="rounded-2xl bg-slate-800/70 p-6 text-center">

                        <FaCheckCircle
                            className="mx-auto text-3xl text-green-400"
                        />

                        <h2 className="mt-4 text-4xl font-bold text-white">
                            {completedTasks}
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Completed
                        </p>

                    </div>

                    <div className="col-span-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-white/80">
                                    Productivity Score
                                </p>

                                <h2 className="mt-2 text-5xl font-bold text-white">
                                    {productivity}%
                                </h2>

                            </div>

                            <FaRocket className="text-5xl text-white/90" />

                        </div>

                        <div className="mt-5 h-3 rounded-full bg-white/20">

                            <div
                                className="h-3 rounded-full bg-white transition-all duration-700"
                                style={{
                                    width: `${productivity}%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}