import {
    FaTasks,
    FaClock,
    FaCheckCircle,
    FaFire,
    FaExclamationTriangle,
} from "react-icons/fa";

import { useDashboard } from "../hooks/useDashboard";

import StatCard from "../components/dashboard/StatCard";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import AIInsight from "../components/dashboard/AI_Insight";
import RecentTasks from "../components/dashboard/RecentTasks";
import QuickActions from "../components/dashboard/QuickAction";
import HeroBanner from "../components/dashboard/HeroBanner";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {
    const { stats, loading, error } = useDashboard();

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="flex h-[75vh] flex-col items-center justify-center gap-5">

                <h2 className="text-2xl font-bold text-red-500">
                    {error}
                </h2>

                <p className="text-slate-400">
                    Unable to fetch dashboard data.
                </p>

            </div>
        );
    }

    return (
        <div className="page-enter space-y-8">

            {/* Header */}

            <section>

                <h1 className="text-4xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-400">
                    Welcome back! Here's an overview of your productivity.
                </p>

            </section>

            <HeroBanner
                totalTasks={stats?.total_tasks ?? 0}
                completedTasks={stats?.completed_tasks ?? 0}
            />

            {/* Statistics */}

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

                <StatCard
                    title="Total Tasks"
                    value={stats?.total_tasks ?? 0}
                    icon={<FaTasks size={24} />}
                    color="from-cyan-500 to-blue-600"
                />

                <StatCard
                    title="Pending"
                    value={stats?.pending_tasks ?? 0}
                    icon={<FaClock size={24} />}
                    color="from-amber-500 to-orange-500"
                />

                <StatCard
                    title="Completed"
                    value={stats?.completed_tasks ?? 0}
                    icon={<FaCheckCircle size={24} />}
                    color="from-green-500 to-emerald-600"
                />

                <StatCard
                    title="High Priority"
                    value={stats?.high_priority ?? 0}
                    icon={<FaFire size={24} />}
                    color="from-pink-500 to-red-500"
                />

                <StatCard
                    title="Overdue"
                    value={stats?.overdue_tasks ?? 0}
                    icon={<FaExclamationTriangle size={24} />}
                    color="from-violet-500 to-purple-600"
                />

            </section>

            {/* Analytics + AI */}

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="xl:col-span-2">
                    <ProductivityChart />
                </div>

                <AIInsight
                    title="Today's AI Insight"
                    message={
                        stats?.high_priority
                            ? `You have ${stats.high_priority} high-priority task${stats.high_priority > 1 ? "s" : ""}. Focus on completing ${stats.high_priority > 1 ? "them" : "it"} first for maximum productivity.`
                            : "Great job! You have no high-priority tasks remaining today."
                    }
                />

            </section>

            {/* Recent Tasks */}

            <section>

                <RecentTasks />

            </section>

            {/* Quick Actions */}

            <section>

                <QuickActions />

            </section>

        </div>
    );
}