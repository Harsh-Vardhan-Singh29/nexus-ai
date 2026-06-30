import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    FaChartPie,
    FaCheckCircle,
    FaClock,
    FaBrain,
} from "react-icons/fa";

import { useTasks } from "../../hooks/useTasks";

import GlassCard from "../ui/GlassCard";
import AnimatedCounter from "../ui/AnimatedCounter";
import SectionHeader from "../ui/SectionHeader";

const COLORS = [
    "#10b981",
    "#f59e0b",
];

export default function ProductivityChart() {

    const { tasks, loading } = useTasks();

    if (loading) {

        return (

            <GlassCard className="p-8">

                <div className="flex h-72 items-center justify-center text-slate-400">

                    Loading productivity analytics...

                </div>

            </GlassCard>

        );

    }

    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pending = tasks.length - completed;

    const productivity =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    const chartData = [
        {
            name: "Completed",
            value: completed,
        },
        {
            name: "Pending",
            value: pending,
        },
    ];

    return (

        <GlassCard className="p-8">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <SectionHeader
                    title="Productivity Analytics"
                    subtitle="AI-generated completion insights"
                    icon={<FaChartPie />}
                />

                <div className="text-right">

                    <h2 className="text-5xl font-bold text-cyan-400">

                        <AnimatedCounter
                            value={productivity}
                            suffix="%"
                        />

                    </h2>

                    <p className="mt-2 text-sm text-slate-400">

                        Productivity Score

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={105}
                            innerRadius={68}
                            paddingAngle={5}
                        >

                            {chartData.map((_, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                color: "#ffffff",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                                color: "#cbd5e1",
                                paddingTop: 20,
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Metrics */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

                    <div className="flex items-center gap-3">

                        <FaCheckCircle className="text-green-400" />

                        <span className="text-sm text-slate-300">

                            Completed Tasks

                        </span>

                    </div>

                    <h2 className="mt-4 text-4xl font-bold text-green-400">

                        <AnimatedCounter
                            value={completed}
                        />

                    </h2>

                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

                    <div className="flex items-center gap-3">

                        <FaClock className="text-yellow-400" />

                        <span className="text-sm text-slate-300">

                            Pending Tasks

                        </span>

                    </div>

                    <h2 className="mt-4 text-4xl font-bold text-yellow-400">

                        <AnimatedCounter
                            value={pending}
                        />

                    </h2>

                </div>

            </div>

            {/* AI Insight */}

            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

                <div className="mb-4 flex items-center gap-3">

                    <FaBrain className="text-cyan-400" />

                    <h3 className="font-semibold text-white">

                        AI Insight

                    </h3>

                </div>

                <p className="leading-7 text-slate-300">

                    {productivity >= 80
                        ? "Excellent momentum. Your completion rate indicates strong productivity. Continue focusing on high-impact tasks."
                        : productivity >= 60
                        ? "You're progressing well. Complete the remaining tasks before taking on new work to maintain your momentum."
                        : productivity >= 40
                        ? "Momentum is building. Completing a few pending tasks will noticeably improve your productivity score."
                        : "Your productivity is currently low. Focus on finishing your highest-priority task to build momentum."}

                </p>

            </div>

        </GlassCard>

    );

}