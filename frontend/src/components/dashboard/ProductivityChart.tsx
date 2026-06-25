import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import { useTasks } from "../../hooks/useTasks";

const COLORS = [
    "#10b981", // Completed
    "#f59e0b", // Pending
];

export default function ProductivityChart() {
    const { tasks, loading } = useTasks();

    if (loading) {
        return (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">
                <div className="h-72 flex items-center justify-center text-slate-400">
                    Loading chart...
                </div>
            </div>
        );
    }

    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pending = tasks.length - completed;

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

    const productivity =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-xl font-bold text-white">
                        Productivity Overview
                    </h2>

                    <p className="text-sm text-slate-400">
                        Completion statistics
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-3xl font-bold text-cyan-400">
                        {productivity}%
                    </p>

                    <p className="text-xs text-slate-400">
                        Productivity Score
                    </p>

                </div>

            </div>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            innerRadius={55}
                            paddingAngle={4}
                        >

                            {chartData.map((_, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-800 p-4">

                    <p className="text-sm text-slate-400">
                        Completed
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-green-400">
                        {completed}
                    </h3>

                </div>

                <div className="rounded-xl bg-slate-800 p-4">

                    <p className="text-sm text-slate-400">
                        Pending
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-yellow-400">
                        {pending}
                    </h3>

                </div>

            </div>

        </div>
    );
}