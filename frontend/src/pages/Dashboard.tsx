import {
    FaTasks,
    FaClock,
    FaCheckCircle,
    FaFire,
    FaExclamationTriangle,
} from "react-icons/fa";
import MetricCard from "../components/ui/MetricCard";
import { useDashboard } from "../hooks/useDashboard";
import { useAIContext } from "../hooks/useAIContext";
import AIOverview from "../components/dashboard/AIOverview";
import HeroBanner from "../components/dashboard/HeroBanner";
import AIGreeting from "../components/dashboard/AIGreeting";
import AIDailyBrief from "../components/dashboard/AIDailyBrief";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import RecentTasks from "../components/dashboard/RecentTasks";
import QuickActions from "../components/dashboard/QuickAction";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {

    const {
        stats,
        loading,
        error,
    } = useDashboard();

    const {
        context,
        loading: aiLoading,
    } = useAIContext();

    if (loading || aiLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (

            <div className="flex h-[75vh] flex-col items-center justify-center">

                <h2 className="text-3xl font-bold text-red-500">
                    Unable to load dashboard
                </h2>

                <p className="mt-3 text-slate-400">
                    {error}
                </p>

            </div>

        );
    }

    return (

        <div className="page-enter space-y-10">

            {/* =======================================
                        AI Greeting
            ======================================= */}

            {context && (

                <AIGreeting
                    priorityTask={context.priority_task}
                    workload={context.workload}
                    momentum={context.momentum_score}
                    estimatedFinish={context.estimated_finish}
                />

            )}

            {/* =======================================
                        Hero Banner
            ======================================= */}

            <HeroBanner
                totalTasks={stats?.total_tasks ?? 0}
                completedTasks={stats?.completed_tasks ?? 0}
                pendingTasks={stats?.pending_tasks ?? 0}
                overdueTasks={stats?.overdue_tasks ?? 0}
                nextTask={context?.next_best_task ?? undefined}
            />

            {/* =======================================
                        AI Daily Brief
            ======================================= */}

            {context && (

                <AIDailyBrief
                    priorityTask={context.priority_task}
                    productivity={context.productivity}
                    momentum={context.momentum_score}
                    energy={context.energy_state}
                    delayRisk={context.delay_risk}
                    burnoutRisk={context.burnout_risk}
                    estimatedFinish={context.estimated_finish}
                    recommendedBreak={context.recommended_break}
                    nextTask={context.next_best_task}
                />

            )}

            {context && (

                <AIOverview
                    productivity={context.productivity}
                    momentum={context.momentum_score}
                    focus={context.focus_score}
                    success={context.completion_probability}
                    risk={context.risk}
                />

            )}

            {/* =======================================
                        Statistics
            ======================================= */}

            <section>

                <div className="mb-5">

                    <h2 className="text-2xl font-semibold text-white">
                        Productivity Overview
                    </h2>

                    <p className="text-slate-400">
                        Live statistics generated from your productivity data.
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

                    <MetricCard
                        title="Total Tasks"
                        value={stats?.total_tasks ?? 0}
                        icon={<FaTasks />}
                        color="text-cyan-400"
                        description="Tasks in your workspace"
                        delay={0.1}
                    />

                    <MetricCard
                        title="Pending"
                        value={stats?.pending_tasks ?? 0}
                        icon={<FaClock />}
                        color="text-yellow-400"
                        description="Still waiting"
                        delay={0.2}
                    />

                    <MetricCard
                        title="Completed"
                        value={stats?.completed_tasks ?? 0}
                        icon={<FaCheckCircle />}
                        color="text-green-400"
                        description="Finished successfully"
                        delay={0.3}
                    />

                    <MetricCard
                        title="High Priority"
                        value={stats?.high_priority ?? 0}
                        icon={<FaFire />}
                        color="text-red-400"
                        description="Need attention"
                        delay={0.4}
                    />

                    <MetricCard
                        title="Overdue"
                        value={stats?.overdue_tasks ?? 0}
                        icon={<FaExclamationTriangle />}
                        color="text-purple-400"
                        description="Past due date"
                        delay={0.5}
                    />

                </div>

            </section>

            {/* =======================================
                        Analytics
            ======================================= */}

            <section className="space-y-5">

                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        Analytics
                    </h2>

                    <p className="text-slate-400">
                        AI-powered insights into your productivity trends.
                    </p>

                </div>

                <ProductivityChart />

            </section>

            {/* =======================================
                        Recent Tasks
            ======================================= */}

            <section className="space-y-5">

                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        Recent Tasks
                    </h2>

                    <p className="text-slate-400">
                        Your latest activity and task progress.
                    </p>

                </div>

                <RecentTasks />

            </section>

            {/* =======================================
                        Quick Actions
            ======================================= */}

            <section className="space-y-5">

                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        Quick Actions
                    </h2>

                    <p className="text-slate-400">
                        Jump into your most common productivity actions.
                    </p>

                </div>

                <QuickActions />

            </section>

        </div>

    );

}